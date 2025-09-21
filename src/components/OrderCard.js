import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  useColorModeValue,
  Divider,
  useToast,
  Icon,
  Tooltip,
  Progress,
  Avatar
} from '@chakra-ui/react';
import { useOrders } from '../hooks/useOrders';
import { useWeb3 } from '../contexts/Web3Context';
import { FaUser, FaStore, FaCheck, FaMoneyBillWave, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const OrderCard = ({ order, onActionComplete }) => {
  const { account } = useWeb3();
  const {
    buyerMarkPaid,
    merchantMarkReceived,
    merchantMarkPaid
  } = useOrders();
  
  const toast = useToast();
  const bg = useColorModeValue('white', 'rgba(26, 26, 46, 0.8)');
  const borderColor = useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.1)');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const hoverBg = useColorModeValue('gray.50', 'rgba(26, 26, 46, 0.9)');

  const isBuyer = account?.toLowerCase() === order.buyer.toLowerCase();
  const isMerchant = account?.toLowerCase() === order.merchant.toLowerCase();

  const getStatusColor = (status) => {
    switch (status) {
      case 0: return 'yellow';    // Created
      case 1: return 'blue';      // BuyerPaid
      case 2: return 'green';     // Completed
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'Created';
      case 1: return 'Buyer Paid';
      case 2: return 'Completed';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 0: return FaClock;
      case 1: return FaMoneyBillWave;
      case 2: return FaCheckCircle;
      default: return FaExclamationTriangle;
    }
  };

  const getProgressValue = (status) => {
    switch (status) {
      case 0: return 25;
      case 1: return 75;
      case 2: return 100;
      default: return 0;
    }
  };

  const getOrderTypeText = (orderType) => {
    return orderType === 0 ? 'Buy Order' : 'Sell Order';
  };

  const getOrderTypeColor = (orderType) => {
    return orderType === 0 ? 'blue' : 'purple';
  };

  const getOrderTypeIcon = (orderType) => {
    return orderType === 0 ? FaUser : FaStore;
  };

  const handleAction = async (action, orderId) => {
    try {
      switch (action) {
        case 'buyerMarkPaid':
          await buyerMarkPaid(orderId);
          break;
        case 'merchantMarkReceived':
          await merchantMarkReceived(orderId);
          break;
        case 'merchantMarkPaid':
          await merchantMarkPaid(orderId);
          break;
        default:
          throw new Error('Unknown action');
      }

      toast({
        title: 'Action completed successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      if (onActionComplete) {
        onActionComplete();
      }
    } catch (error) {
      console.error('Error performing action:', error);
      toast({
        title: 'Action failed',
        description: error.message || 'Failed to complete action',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const renderActionButtons = () => {
    if (order.status === 2) return []; // Order completed

    const buttons = [];

    if (isBuyer && order.orderType === 0 && order.status === 0) {
      buttons.push(
        <Button
          key="markPaid"
          size="sm"
          colorScheme="green"
          leftIcon={<Icon as={FaMoneyBillWave} />}
          onClick={() => handleAction('buyerMarkPaid', order.id)}
          borderRadius="xl"
          _hover={{ 
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
          }}
          transition="all 0.2s"
        >
          Mark as Paid
        </Button>
      );
    }

    if (isMerchant && order.orderType === 0 && order.status === 1) {
      buttons.push(
        <Button
          key="confirmReceived"
          size="sm"
          colorScheme="yellow"
          leftIcon={<Icon as={FaCheck} />}
          onClick={() => handleAction('merchantMarkReceived', order.id)}
          borderRadius="xl"
          _hover={{ 
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(234, 179, 8, 0.3)'
          }}
          transition="all 0.2s"
        >
          Confirm Received
        </Button>
      );
    }

    if (isMerchant && order.orderType === 1 && order.status === 0) {
      buttons.push(
        <Button
          key="markPaid"
          size="sm"
          colorScheme="green"
          leftIcon={<Icon as={FaMoneyBillWave} />}
          onClick={() => handleAction('merchantMarkPaid', order.id)}
          borderRadius="xl"
          _hover={{ 
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
          }}
          transition="all 0.2s"
        >
          Mark as Paid
        </Button>
      );
    }


    return buttons || [];
  };

  return (
    <Box
      bg={bg}
      border="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      p={6}
      shadow="xl"
      backdropFilter="blur(20px)"
      position="relative"
      _hover={{ 
        shadow: '2xl',
        transform: 'translateY(-4px)',
        bg: hoverBg
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${getOrderTypeColor(order.orderType) === 'blue' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(147, 51, 234, 0.1)'} 0%, transparent 100%)`,
        borderRadius: '2xl',
        zIndex: -1,
      }}
    >
      <VStack spacing={4} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={2}>
            <HStack spacing={3}>
              <Badge 
                colorScheme={getOrderTypeColor(order.orderType)}
                borderRadius="full"
                px={3}
                py={1}
                fontSize="xs"
                fontWeight="semibold"
                leftIcon={<Icon as={getOrderTypeIcon(order.orderType)} boxSize={2} />}
              >
                {getOrderTypeText(order.orderType)}
              </Badge>
              <Badge 
                colorScheme={getStatusColor(order.status)}
                variant="subtle"
                borderRadius="full"
                px={3}
                py={1}
                fontSize="xs"
                fontWeight="semibold"
                leftIcon={<Icon as={getStatusIcon(order.status)} boxSize={2} />}
              >
                {getStatusText(order.status)}
              </Badge>
            </HStack>
            <HStack spacing={2}>
              <Text fontSize="sm" color={subTextColor} fontFamily="mono">
                Order #{order.id}
              </Text>
              <Tooltip label="Order Progress" placement="top">
                <Box>
                  <Progress 
                    value={getProgressValue(order.status)} 
                    size="sm" 
                    colorScheme={getStatusColor(order.status)}
                    borderRadius="full"
                    width="100px"
                    bg="rgba(255, 255, 255, 0.1)"
                  />
                </Box>
              </Tooltip>
            </HStack>
          </VStack>
          
          <VStack align="end" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold" color="brand.400">
              {order.amount}
            </Text>
            <Text fontSize="sm" color={subTextColor} fontWeight="semibold">
              USDC
            </Text>
          </VStack>
        </HStack>

        <Divider borderColor="rgba(255, 255, 255, 0.1)" />

        {/* Order Details */}
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between" align="center">
            <HStack spacing={2}>
              <Icon as={FaUser} color="blue.400" boxSize={3} />
              <Text fontSize="sm" color={subTextColor} fontWeight="medium">Buyer:</Text>
            </HStack>
            <Tooltip label={order.buyer} placement="top">
              <Text 
                fontSize="sm" 
                fontFamily="mono" 
                color={textColor}
                bg="rgba(255, 255, 255, 0.05)"
                px={2}
                py={1}
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
              >
                {order.buyer.slice(0, 8)}...{order.buyer.slice(-6)}
              </Text>
            </Tooltip>
          </HStack>
          
          <HStack justify="space-between" align="center">
            <HStack spacing={2}>
              <Icon as={FaStore} color="purple.400" boxSize={3} />
              <Text fontSize="sm" color={subTextColor} fontWeight="medium">Merchant:</Text>
            </HStack>
            <Tooltip label={order.merchant} placement="top">
              <Text 
                fontSize="sm" 
                fontFamily="mono" 
                color={textColor}
                bg="rgba(255, 255, 255, 0.05)"
                px={2}
                py={1}
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
              >
                {order.merchant.slice(0, 8)}...{order.merchant.slice(-6)}
              </Text>
            </Tooltip>
          </HStack>
          
          <HStack justify="space-between" align="center">
            <HStack spacing={2}>
              <Icon as={FaMoneyBillWave} color="green.400" boxSize={3} />
              <Text fontSize="sm" color={subTextColor} fontWeight="medium">Payment:</Text>
            </HStack>
            <Tooltip label={order.upiId} placement="top">
              <Text 
                fontSize="sm" 
                fontFamily="mono" 
                color={textColor}
                bg="rgba(255, 255, 255, 0.05)"
                px={2}
                py={1}
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                maxW="200px" 
                isTruncated
              >
                {order.upiId}
              </Text>
            </Tooltip>
          </HStack>
        </VStack>

        {/* Action Buttons */}
        {(() => {
          const actionButtons = renderActionButtons();
          return actionButtons && actionButtons.length > 0 && (
            <>
              <Divider borderColor="rgba(255, 255, 255, 0.1)" />
              <HStack spacing={3} justify="center">
                {actionButtons}
              </HStack>
            </>
          );
        })()}
      </VStack>
    </Box>
  );
};

export default OrderCard; 