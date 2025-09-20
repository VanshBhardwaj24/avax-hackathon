import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  HStack,
  Icon,
  Divider,
  Badge,
  Tooltip
} from '@chakra-ui/react';
import { useOrders } from '../hooks/useOrders';
import { useWeb3 } from '../contexts/Web3Context';
import { FaPlus, FaStore, FaUser, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';

const CreateOrderForm = ({ onOrderCreated }) => {
  const [formData, setFormData] = useState({
    merchant: '',
    orderType: '0', // 0 = Buy, 1 = Sell
    upiId: '',
    amount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createOrder } = useOrders();
  const { account } = useWeb3();
  const toast = useToast();
  
  const bg = useColorModeValue('white', 'rgba(26, 26, 46, 0.8)');
  const borderColor = useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.1)');
  const textColor = useColorModeValue('gray.800', 'white');
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const inputBg = useColorModeValue('white', 'rgba(255, 255, 255, 0.05)');
  const inputBorder = useColorModeValue('gray.300', 'rgba(255, 255, 255, 0.2)');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!account) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet first',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!formData.merchant || !formData.upiId || !formData.amount) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      await createOrder(
        formData.merchant,
        parseInt(formData.orderType),
        formData.upiId,
        formData.amount
      );

      toast({
        title: 'Order created successfully!',
        description: 'Your order has been created and is now visible on the blockchain',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        merchant: '',
        orderType: '0',
        upiId: '',
        amount: ''
      });

      if (onOrderCreated) {
        onOrderCreated();
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Error creating order',
        description: error.message || 'Failed to create order. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      bg={bg}
      border="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      p={8}
      shadow="xl"
      backdropFilter="blur(20px)"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
        borderRadius: '2xl',
        zIndex: -1,
      }}
    >
      {/* Header */}
      <HStack spacing={3} mb={6}>
        <Icon as={FaPlus} color="brand.400" boxSize={6} />
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          Create New Order
        </Text>
        <Badge 
          colorScheme="blue" 
          variant="subtle" 
          borderRadius="full"
          px={3}
          py={1}
          fontSize="xs"
        >
          P2P Trading
        </Badge>
      </HStack>
      
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          {/* Order Type Selection */}
          <FormControl isRequired>
            <HStack spacing={2} mb={3}>
              <FormLabel color={labelColor} fontSize="sm" fontWeight="semibold">
                Order Type
              </FormLabel>
              <Tooltip 
                label="Choose whether you want to buy from a merchant or sell to a customer"
                placement="top"
              >
                <Icon as={FaInfoCircle} color="gray.400" boxSize={3} />
              </Tooltip>
            </HStack>
            <Select
              value={formData.orderType}
              onChange={(e) => handleInputChange('orderType', e.target.value)}
              bg={inputBg}
              borderColor={inputBorder}
              color={textColor}
              borderRadius="xl"
              _hover={{ borderColor: 'brand.400' }}
              _focus={{ 
                borderColor: 'brand.400',
                boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.3)'
              }}
            >
              <option value="0" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
                🛒 Buy Order (Purchase from merchant)
              </option>
              <option value="1" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
                🏪 Sell Order (Sell to customer)
              </option>
            </Select>
          </FormControl>

          <Divider borderColor="rgba(255, 255, 255, 0.1)" />

          {/* Merchant Address */}
          <FormControl isRequired>
            <HStack spacing={2} mb={3}>
              <FormLabel color={labelColor} fontSize="sm" fontWeight="semibold">
                {formData.orderType === '0' ? 'Merchant Address' : 'Customer Address'}
              </FormLabel>
              <Tooltip 
                label={formData.orderType === '0' ? 'Address of the merchant you want to buy from' : 'Address of the customer you want to sell to'}
                placement="top"
              >
                <Icon as={FaInfoCircle} color="gray.400" boxSize={3} />
              </Tooltip>
            </HStack>
            <Input
              placeholder="0x..."
              value={formData.merchant}
              onChange={(e) => handleInputChange('merchant', e.target.value)}
              fontFamily="mono"
              bg={inputBg}
              borderColor={inputBorder}
              color={textColor}
              borderRadius="xl"
              _hover={{ borderColor: 'brand.400' }}
              _focus={{ 
                borderColor: 'brand.400',
                boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.3)'
              }}
              _placeholder={{ color: 'gray.400' }}
            />
          </FormControl>

          {/* UPI/Payment Info */}
          <FormControl isRequired>
            <HStack spacing={2} mb={3}>
              <FormLabel color={labelColor} fontSize="sm" fontWeight="semibold">
                Payment Information
              </FormLabel>
              <Tooltip 
                label="UPI ID, bank details, or other payment method information"
                placement="top"
              >
                <Icon as={FaInfoCircle} color="gray.400" boxSize={3} />
              </Tooltip>
            </HStack>
            <Input
              placeholder="Enter UPI ID, bank details, or payment info"
              value={formData.upiId}
              onChange={(e) => handleInputChange('upiId', e.target.value)}
              bg={inputBg}
              borderColor={inputBorder}
              color={textColor}
              borderRadius="xl"
              _hover={{ borderColor: 'brand.400' }}
              _focus={{ 
                borderColor: 'brand.400',
                boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.3)'
              }}
              _placeholder={{ color: 'gray.400' }}
            />
          </FormControl>

          {/* Amount */}
          <FormControl isRequired>
            <HStack spacing={2} mb={3}>
              <FormLabel color={labelColor} fontSize="sm" fontWeight="semibold">
                Amount (USDC)
              </FormLabel>
              <Tooltip 
                label="Amount in USDC stablecoin units"
                placement="top"
              >
                <Icon as={FaInfoCircle} color="gray.400" boxSize={3} />
              </Tooltip>
            </HStack>
            <NumberInput
              min={0}
              value={formData.amount}
              onChange={(value) => handleInputChange('amount', value)}
            >
              <NumberInputField 
                placeholder="Enter amount in USDC" 
                bg={inputBg}
                borderColor={inputBorder}
                color={textColor}
                borderRadius="xl"
                _hover={{ borderColor: 'brand.400' }}
                _focus={{ 
                  borderColor: 'brand.400',
                  boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.3)'
                }}
                _placeholder={{ color: 'gray.400' }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper 
                  color={textColor}
                  borderColor={inputBorder}
                  _hover={{ bg: 'rgba(59, 130, 246, 0.1)' }}
                />
                <NumberDecrementStepper 
                  color={textColor}
                  borderColor={inputBorder}
                  _hover={{ bg: 'rgba(59, 130, 246, 0.1)' }}
                />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Divider borderColor="rgba(255, 255, 255, 0.1)" />

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Creating Order..."
            width="full"
            size="lg"
            borderRadius="xl"
            leftIcon={<Icon as={FaPlus} />}
            _hover={{ 
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
            }}
            _active={{ transform: 'translateY(0)' }}
            transition="all 0.2s"
            bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
            _hover={{
              bgGradient: "linear(to-r, brand.300, brand.400, brand.500)",
            }}
          >
            Create Order
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateOrderForm; 