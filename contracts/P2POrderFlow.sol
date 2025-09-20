// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/**
 * @title P2POrderFlow
 * @dev A smart contract for managing P2P (Peer-to-Peer) order flow for stablecoin trading
 * @notice This contract handles the creation, management, and completion of P2P trading orders
 */
contract P2POrderFlow {
    
    // ============ STRUCTS ============
    
    /**
     * @dev Structure representing an order in the system
     */
    struct Order {
        uint256 id;                 // Unique order identifier
        address buyer;              // Address of the buyer
        address merchant;           // Address of the merchant
        OrderType orderType;        // Type of order (Buy or Sell)
        OrderStatus status;         // Current status of the order
        string upiId;               // UPI ID or payment information
        uint256 amount;             // Amount in USDC (with 6 decimals)
        uint256 createdAt;          // Timestamp when order was created
        uint256 updatedAt;          // Timestamp when order was last updated
    }
    
    // ============ ENUMS ============
    
    /**
     * @dev Enum defining the types of orders
     */
    enum OrderType {
        Buy,    // 0: Buyer wants to buy stablecoins
        Sell    // 1: Merchant wants to sell stablecoins
    }
    
    /**
     * @dev Enum defining the possible statuses of an order
     */
    enum OrderStatus {
        Created,            // 0: Order created, waiting for action
        BuyerPaid,          // 1: Buyer marked as paid, waiting for merchant confirmation
        Completed           // 2: Order completed successfully
    }
    
    // ============ STATE VARIABLES ============
    
    mapping(uint256 => Order) public orders;           // Mapping from order ID to Order struct
    uint256 public orderCount;                         // Total number of orders created
    address public owner;                              // Contract owner address
    
    // ============ EVENTS ============
    
    /**
     * @dev Emitted when an order status changes
     */
    event OrderStatusChanged(
        uint256 indexed orderId,
        address indexed buyer,
        address indexed merchant,
        OrderType orderType,
        uint256 amount,
        OrderStatus newStatus
    );
    
    /**
     * @dev Emitted when a new order is created
     */
    event OrderCreated(
        uint256 indexed orderId,
        address indexed buyer,
        address indexed merchant,
        OrderType orderType,
        uint256 amount,
        string upiId
    );
    
    // ============ MODIFIERS ============
    
    /**
     * @dev Modifier to restrict function access to the contract owner
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "P2POrderFlow: Only owner can call this function");
        _;
    }
    
    /**
     * @dev Modifier to ensure the order exists
     */
    modifier orderExists(uint256 orderId) {
        require(orderId > 0 && orderId <= orderCount, "P2POrderFlow: Order does not exist");
        _;
    }
    
    /**
     * @dev Modifier to ensure the caller is the buyer of the order
     */
    modifier onlyBuyer(uint256 orderId) {
        require(orders[orderId].buyer == msg.sender, "P2POrderFlow: Only buyer can call this function");
        _;
    }
    
    /**
     * @dev Modifier to ensure the caller is the merchant of the order
     */
    modifier onlyMerchant(uint256 orderId) {
        require(orders[orderId].merchant == msg.sender, "P2POrderFlow: Only merchant can call this function");
        _;
    }
    
    /**
     * @dev Modifier to ensure the order is in a specific status
     */
    modifier orderStatus(uint256 orderId, OrderStatus status) {
        require(orders[orderId].status == status, "P2POrderFlow: Invalid order status for this action");
        _;
    }
    
    // ============ CONSTRUCTOR ============
    
    /**
     * @dev Constructor sets the contract owner
     */
    constructor() {
        owner = msg.sender;
    }
    
    // ============ CORE FUNCTIONS ============
    
    /**
     * @dev Creates a new P2P order
     * @param merchant Address of the merchant
     * @param orderType Type of order (0 for Buy, 1 for Sell)
     * @param upiId UPI ID or payment information
     * @param amount Amount in USDC (with 6 decimals)
     * @return orderId The ID of the newly created order
     */
    function createOrder(
        address merchant,
        OrderType orderType,
        string memory upiId,
        uint256 amount
    ) external returns (uint256 orderId) {
        require(merchant != address(0), "P2POrderFlow: Invalid merchant address");
        require(merchant != msg.sender, "P2POrderFlow: Cannot create order with yourself");
        require(amount > 0, "P2POrderFlow: Amount must be greater than 0");
        require(bytes(upiId).length > 0, "P2POrderFlow: UPI ID cannot be empty");
        
        orderCount++;
        orderId = orderCount;
        
        orders[orderId] = Order({
            id: orderId,
            buyer: msg.sender,
            merchant: merchant,
            orderType: orderType,
            status: OrderStatus.Created,
            upiId: upiId,
            amount: amount,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        emit OrderCreated(orderId, msg.sender, merchant, orderType, amount, upiId);
        emit OrderStatusChanged(orderId, msg.sender, merchant, orderType, amount, OrderStatus.Created);
        
        return orderId;
    }
    
    /**
     * @dev Buyer marks the order as paid
     * @param orderId ID of the order to mark as paid
     */
    function buyerMarkPaid(uint256 orderId) 
        external 
        orderExists(orderId)
        onlyBuyer(orderId)
        orderStatus(orderId, OrderStatus.Created)
    {
        orders[orderId].status = OrderStatus.BuyerPaid;
        orders[orderId].updatedAt = block.timestamp;
        
        emit OrderStatusChanged(
            orderId,
            orders[orderId].buyer,
            orders[orderId].merchant,
            orders[orderId].orderType,
            orders[orderId].amount,
            OrderStatus.BuyerPaid
        );
    }
    
    /**
     * @dev Merchant confirms receipt of payment from buyer
     * @param orderId ID of the order to confirm receipt
     */
    function merchantMarkReceived(uint256 orderId) 
        external 
        orderExists(orderId)
        onlyMerchant(orderId)
        orderStatus(orderId, OrderStatus.BuyerPaid)
    {
        // For buy orders, merchant confirming receipt completes the order directly
        orders[orderId].status = OrderStatus.Completed;
        orders[orderId].updatedAt = block.timestamp;
        
        emit OrderStatusChanged(
            orderId,
            orders[orderId].buyer,
            orders[orderId].merchant,
            orders[orderId].orderType,
            orders[orderId].amount,
            OrderStatus.Completed
        );
    }
    
    /**
     * @dev Merchant marks the order as paid (for sell orders)
     * @param orderId ID of the order to mark as paid
     */
    function merchantMarkPaid(uint256 orderId) 
        external 
        orderExists(orderId)
        onlyMerchant(orderId)
    {
        // For sell orders, merchant marking as paid completes the order directly
        require(
            orders[orderId].orderType == OrderType.Sell && orders[orderId].status == OrderStatus.Created,
            "P2POrderFlow: Invalid order status for this action"
        );
        
        orders[orderId].status = OrderStatus.Completed;
        orders[orderId].updatedAt = block.timestamp;
        
        emit OrderStatusChanged(
            orderId,
            orders[orderId].buyer,
            orders[orderId].merchant,
            orders[orderId].orderType,
            orders[orderId].amount,
            OrderStatus.Completed
        );
    }
    

    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @dev Gets the details of a specific order
     * @param orderId ID of the order to retrieve
     * @return Order struct containing all order details
     */
    function getOrder(uint256 orderId) external view returns (Order memory) {
        require(orderId > 0 && orderId <= orderCount, "P2POrderFlow: Order does not exist");
        return orders[orderId];
    }
    
    /**
     * @dev Gets all orders for a specific address (as buyer or merchant)
     * @param user Address to get orders for
     * @return userOrders Array of order IDs for the user
     */
    function getUserOrders(address user) external view returns (uint256[] memory userOrders) {
        uint256[] memory tempOrders = new uint256[](orderCount);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= orderCount; i++) {
            if (orders[i].buyer == user || orders[i].merchant == user) {
                tempOrders[count] = i;
                count++;
            }
        }
        
        userOrders = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            userOrders[i] = tempOrders[i];
        }
        
        return userOrders;
    }
    
    /**
     * @dev Gets orders by status
     * @param status Status to filter by
     * @return ordersByStatus Array of order IDs with the specified status
     */
    function getOrdersByStatus(OrderStatus status) external view returns (uint256[] memory ordersByStatus) {
        uint256[] memory tempOrders = new uint256[](orderCount);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= orderCount; i++) {
            if (orders[i].status == status) {
                tempOrders[count] = i;
                count++;
            }
        }
        
        ordersByStatus = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            ordersByStatus[i] = tempOrders[i];
        }
        
        return ordersByStatus;
    }
    
    /**
     * @dev Gets the total number of orders
     * @return Total count of orders
     */
    function getTotalOrders() external view returns (uint256) {
        return orderCount;
    }
    
    // ============ ADMIN FUNCTIONS ============
    
    /**
     * @dev Allows the owner to update the contract owner
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "P2POrderFlow: New owner cannot be zero address");
        owner = newOwner;
    }
    
    /**
     * @dev Allows the owner to pause the contract (emergency function)
     * @notice This is a placeholder for future implementation
     */
    function pauseContract() external view onlyOwner {
        // Implementation for pausing the contract
        // This would require additional state variables and logic
        revert("P2POrderFlow: Pause functionality not yet implemented");
    }
    
    /**
     * @dev Allows the owner to unpause the contract (emergency function)
     * @notice This is a placeholder for future implementation
     */
    function unpauseContract() external view onlyOwner {
        // Implementation for unpausing the contract
        // This would require additional state variables and logic
        revert("P2POrderFlow: Unpause functionality not yet implemented");
    }
} 