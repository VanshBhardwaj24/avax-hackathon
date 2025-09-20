import { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

export const useOrders = () => {
  const { contract, account } = useWeb3();
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all orders
  const fetchOrders = useCallback(async () => {
    if (!contract) {
      console.log('❌ No contract available for fetchOrders');
      return;
    }
    
    try {
      console.log('🔄 Fetching orders from contract:', contract.address);
      setIsLoading(true);
      
      const count = await contract.orderCount();
      console.log('📊 Total orders found:', Number(count));
      setOrderCount(Number(count));
      
      const ordersArray = [];
      for (let i = 1; i <= Number(count); i++) {
        try {
          const order = await contract.getOrder(i);
          const orderData = {
            id: i,
            buyer: order.buyer,
            merchant: order.merchant,
            orderType: Number(order.orderType), // 0 = Buy, 1 = Sell
            upiId: order.upiId,
            amount: Number(order.amount),
            status: Number(order.status)
          };
          ordersArray.push(orderData);
          console.log(`📋 Order ${i}:`, orderData);
        } catch (error) {
          console.error(`❌ Error fetching order ${i}:`, error);
        }
      }
      
      console.log('✅ Setting orders in state:', ordersArray);
      setOrders(ordersArray);
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  }, [contract]);

  // Create new order
  const createOrder = useCallback(async (merchant, orderType, upiId, amount) => {
    if (!contract) throw new Error('Contract not connected');
    
    try {
      setIsLoading(true);
      const tx = await contract.createOrder(merchant, orderType, upiId, amount);
      await tx.wait();
      await fetchOrders();
      return tx;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [contract, fetchOrders]);

  // Buyer marks order as paid
  const buyerMarkPaid = useCallback(async (orderId) => {
    if (!contract) throw new Error('Contract not connected');
    
    try {
      setIsLoading(true);
      const tx = await contract.buyerMarkPaid(orderId);
      await tx.wait();
      await fetchOrders();
      return tx;
    } catch (error) {
      console.error('Error marking order as paid:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [contract, fetchOrders]);

  // Merchant confirms payment received
  const merchantMarkReceived = useCallback(async (orderId) => {
    if (!contract) throw new Error('Contract not connected');
    
    try {
      setIsLoading(true);
      const tx = await contract.merchantMarkReceived(orderId);
      await tx.wait();
      await fetchOrders();
      return tx;
    } catch (error) {
      console.error('Error marking payment received:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [contract, fetchOrders]);

  // Merchant marks order as paid (for sell orders)
  const merchantMarkPaid = useCallback(async (orderId) => {
    if (!contract) throw new Error('Contract not connected');
    
    try {
      setIsLoading(true);
      const tx = await contract.merchantMarkPaid(orderId);
      await tx.wait();
      await fetchOrders();
      return tx;
    } catch (error) {
      console.error('Error marking order as paid:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [contract, fetchOrders]);



  // Listen for contract events
  useEffect(() => {
    if (!contract) return;

    console.log('Setting up event listeners for contract:', contract.address);

    const handleOrderStatusChanged = (orderId, buyer, merchant, orderType, amount, newStatus) => {
      console.log('🎯 Order status changed event received:', { 
        orderId: Number(orderId), 
        buyer, 
        merchant, 
        orderType: Number(orderType), 
        amount: Number(amount), 
        newStatus: Number(newStatus) 
      });
      
      // Force refresh orders immediately
      setTimeout(() => {
        console.log('🔄 Refreshing orders after status change...');
        fetchOrders();
      }, 1000); // Small delay to ensure transaction is mined
    };

    const handleOrderCreated = (orderId, buyer, merchant, orderType, amount, upiId) => {
      console.log('🆕 Order created event received:', { 
        orderId: Number(orderId), 
        buyer, 
        merchant, 
        orderType: Number(orderType), 
        amount: Number(amount) 
      });
      
      // Force refresh orders immediately
      setTimeout(() => {
        console.log('🔄 Refreshing orders after creation...');
        fetchOrders();
      }, 1000);
    };

    // Listen to both events
    contract.on('OrderStatusChanged', handleOrderStatusChanged);
    contract.on('OrderCreated', handleOrderCreated);

    console.log('✅ Event listeners set up successfully');

    return () => {
      console.log('🧹 Cleaning up event listeners');
      contract.off('OrderStatusChanged', handleOrderStatusChanged);
      contract.off('OrderCreated', handleOrderCreated);
    };
  }, [contract, fetchOrders]);

  // Fetch orders on mount and when contract changes
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Set up periodic refresh every 30 seconds
  useEffect(() => {
    if (!contract) return;
    
    const interval = setInterval(() => {
      console.log('⏰ Periodic refresh triggered');
      fetchOrders();
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, [contract, fetchOrders]);

  // Get orders filtered by user role
  const getBuyerOrders = useCallback(() => {
    const buyerOrders = orders.filter(order => order.buyer.toLowerCase() === account?.toLowerCase());
    console.log('🔍 Filtering buyer orders:', {
      totalOrders: orders.length,
      account: account,
      buyerOrders: buyerOrders.length,
      buyerOrdersData: buyerOrders
    });
    return buyerOrders;
  }, [orders, account]);

  const getMerchantOrders = useCallback(() => {
    const merchantOrders = orders.filter(order => order.merchant.toLowerCase() === account?.toLowerCase());
    console.log('🔍 Filtering merchant orders:', {
      totalOrders: orders.length,
      account: account,
      merchantOrders: merchantOrders.length,
      merchantOrdersData: merchantOrders
    });
    return merchantOrders;
  }, [orders, account]);

  // Get orders by status
  const getOrdersByStatus = useCallback((status) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  return {
    orders,
    orderCount,
    isLoading,
    createOrder,
    buyerMarkPaid,
    merchantMarkReceived,
    merchantMarkPaid,
    fetchOrders,
    getBuyerOrders,
    getMerchantOrders,
    getOrdersByStatus
  };
}; 