import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Button,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Icon,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
  Fade,
  ScaleFade
} from '@chakra-ui/react';
import { useWeb3 } from '../contexts/Web3Context';
import { useOrders } from '../hooks/useOrders';
import CreateOrderForm from './CreateOrderForm';
import OrderCard from './OrderCard';
import { FaPlus, FaRedo, FaUser, FaChartLine, FaWallet, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const BuyerView = () => {
  const { account, isConnected } = useWeb3();
  const { orders, orderCount, getBuyerOrders, isLoading, fetchOrders } = useOrders();
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const bg = useColorModeValue('gray.50', 'transparent');
  const cardBg = useColorModeValue('white', 'rgba(26, 26, 46, 0.8)');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.1)');

  const buyerOrders = getBuyerOrders();
  
  const pendingOrders = buyerOrders.filter(order => order.status < 2);
  const completedOrders = buyerOrders.filter(order => order.status === 2);

  const handleOrderCreated = () => {
    setShowCreateForm(false);
    fetchOrders();
  };

  const handleActionComplete = () => {
    fetchOrders();
  };

  if (!isConnected) {
    return (
      <Center py={20}>
        <Fade in={true}>
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="300px"
            maxW="600px"
            borderRadius="2xl"
            bg="rgba(26, 26, 46, 0.8)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            boxShadow="xl"
          >
            <Icon as={FaWallet} boxSize="60px" color="brand.400" mb={4} />
            <AlertTitle mt={4} mb={1} fontSize="2xl" color={textColor}>
              Wallet Not Connected
            </AlertTitle>
            <AlertDescription maxWidth="sm" color={subTextColor} fontSize="lg">
              Please connect your wallet to view and manage your P2P orders.
            </AlertDescription>
          </Alert>
        </Fade>
      </Center>
    );
  }

  return (
    <Box bg={bg} minH="calc(100vh - 80px)" p={6}>
      <VStack spacing={8} maxW="1200px" mx="auto" align="stretch">
        {/* Header */}
        <Fade in={true}>
          <HStack justify="space-between" align="center" mb={4}>
            <VStack align="start" spacing={2}>
              <HStack spacing={3}>
                <Icon as={FaUser} color="brand.400" boxSize={8} />
                <VStack align="start" spacing={1}>
                  <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                    Buyer Dashboard
                  </Text>
                  <Text color={subTextColor} fontSize="lg">
                    Manage your P2P buy and sell orders
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            
            <HStack spacing={4}>
              <Button
                leftIcon={<Icon as={FaRedo} />}
                onClick={fetchOrders}
                isLoading={isLoading}
                variant="outline"
                borderRadius="xl"
                borderColor="rgba(255, 255, 255, 0.2)"
                color={textColor}
                _hover={{ 
                  bg: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)'
                }}
                transition="all 0.2s"
              >
                Refresh
              </Button>
              <Button
                leftIcon={<Icon as={FaPlus} />}
                onClick={() => setShowCreateForm(!showCreateForm)}
                colorScheme="blue"
                borderRadius="xl"
                _hover={{ 
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                }}
                transition="all 0.2s"
                bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
                _hover={{
                  bgGradient: "linear(to-r, brand.300, brand.400, brand.500)",
                }}
              >
                {showCreateForm ? 'Cancel' : 'Create Order'}
              </Button>
            </HStack>
          </HStack>
        </Fade>

        {/* Create Order Form */}
        <ScaleFade in={showCreateForm} unmountOnExit>
          {showCreateForm && (
            <CreateOrderForm onOrderCreated={handleOrderCreated} />
          )}
        </ScaleFade>

        {/* Stats Cards */}
        <Fade in={true}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Stat
              bg={cardBg}
              p={6}
              borderRadius="2xl"
              shadow="xl"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <StatLabel color={subTextColor} fontSize="sm" fontWeight="semibold">
                <Icon as={FaClock} color="yellow.400" mr={2} />
                Pending Orders
              </StatLabel>
              <StatNumber color={textColor} fontSize="3xl">
                {pendingOrders.length}
              </StatNumber>
              <StatHelpText color={subTextColor}>
                Orders in progress
              </StatHelpText>
            </Stat>

            <Stat
              bg={cardBg}
              p={6}
              borderRadius="2xl"
              shadow="xl"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <StatLabel color={subTextColor} fontSize="sm" fontWeight="semibold">
                <Icon as={FaCheckCircle} color="green.400" mr={2} />
                Completed Orders
              </StatLabel>
              <StatNumber color={textColor} fontSize="3xl">
                {completedOrders.length}
              </StatNumber>
              <StatHelpText color={subTextColor}>
                Successfully finished
              </StatHelpText>
            </Stat>

            <Stat
              bg={cardBg}
              p={6}
              borderRadius="2xl"
              shadow="xl"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <StatLabel color={subTextColor} fontSize="sm" fontWeight="semibold">
                <Icon as={FaChartLine} color="brand.400" mr={2} />
                Total Orders
              </StatLabel>
              <StatNumber color={textColor} fontSize="3xl">
                {buyerOrders.length}
              </StatNumber>
              <StatHelpText color={subTextColor}>
                All time orders
              </StatHelpText>
            </Stat>
          </SimpleGrid>
        </Fade>

        {/* Orders Tabs */}
        <Fade in={true}>
          <Box 
            bg={cardBg} 
            borderRadius="2xl" 
            shadow="xl" 
            overflow="hidden"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
          >
            <HStack justify="space-between" p={6} borderBottom="1px" borderColor="rgba(255, 255, 255, 0.1)">
              <HStack spacing={3}>
                <Icon as={FaChartLine} color="brand.400" boxSize={5} />
                <Text fontSize="xl" fontWeight="bold" color={textColor}>Orders</Text>
                <Badge 
                  colorScheme="blue" 
                  variant="subtle" 
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {buyerOrders.length} Total
                </Badge>
              </HStack>
              <HStack spacing={3}>
                <Text fontSize="sm" color={subTextColor}>
                  {isLoading ? 'Refreshing...' : `Last updated: ${new Date().toLocaleTimeString()}`}
                </Text>
                <Button
                  size="sm"
                  leftIcon={<Icon as={FaRedo} />}
                  onClick={fetchOrders}
                  isLoading={isLoading}
                  variant="ghost"
                  colorScheme="blue"
                  borderRadius="xl"
                  _hover={{ bg: 'rgba(59, 130, 246, 0.1)' }}
                >
                  Refresh
                </Button>
              </HStack>
            </HStack>
          
            <Tabs variant="enclosed" colorScheme="blue">
              <TabList bg="rgba(255, 255, 255, 0.05)" px={6}>
                <Tab 
                  color={textColor}
                  _selected={{ 
                    color: 'brand.400',
                    borderColor: 'brand.400',
                    bg: 'rgba(59, 130, 246, 0.1)'
                  }}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <HStack spacing={2}>
                    <Icon as={FaClock} />
                    <Text>Pending Orders</Text>
                    <Badge colorScheme="yellow" variant="subtle" borderRadius="full">
                      {pendingOrders.length}
                    </Badge>
                  </HStack>
                </Tab>
                <Tab 
                  color={textColor}
                  _selected={{ 
                    color: 'brand.400',
                    borderColor: 'brand.400',
                    bg: 'rgba(59, 130, 246, 0.1)'
                  }}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <HStack spacing={2}>
                    <Icon as={FaCheckCircle} />
                    <Text>Completed Orders</Text>
                    <Badge colorScheme="green" variant="subtle" borderRadius="full">
                      {completedOrders.length}
                    </Badge>
                  </HStack>
                </Tab>
              </TabList>

              <TabPanels p={6}>
                {/* Pending Orders */}
                <TabPanel p={0}>
                  {isLoading ? (
                    <Center py={20}>
                      <VStack spacing={4}>
                        <Spinner size="xl" color="brand.400" />
                        <Text color={subTextColor}>Loading orders...</Text>
                      </VStack>
                    </Center>
                  ) : pendingOrders.length === 0 ? (
                    <Center py={20}>
                      <VStack spacing={6}>
                        <Icon as={FaClock} boxSize={16} color="gray.400" />
                        <VStack spacing={2}>
                          <Text color={textColor} fontSize="xl" fontWeight="semibold">
                            No pending orders
                          </Text>
                          <Text color={subTextColor} fontSize="lg" textAlign="center">
                            Create a new order to get started with P2P trading
                          </Text>
                        </VStack>
                        <Button
                          leftIcon={<Icon as={FaPlus} />}
                          onClick={() => setShowCreateForm(true)}
                          colorScheme="blue"
                          size="lg"
                          borderRadius="xl"
                          bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
                        >
                          Create Your First Order
                        </Button>
                      </VStack>
                    </Center>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                      {pendingOrders.map((order, index) => (
                        <Fade in={true} delay={index * 0.1} key={order.id}>
                          <OrderCard
                            order={order}
                            onActionComplete={handleActionComplete}
                          />
                        </Fade>
                      ))}
                    </SimpleGrid>
                  )}
                </TabPanel>

                {/* Completed Orders */}
                <TabPanel p={0}>
                  {isLoading ? (
                    <Center py={20}>
                      <VStack spacing={4}>
                        <Spinner size="xl" color="brand.400" />
                        <Text color={subTextColor}>Loading orders...</Text>
                      </VStack>
                    </Center>
                  ) : completedOrders.length === 0 ? (
                    <Center py={20}>
                      <VStack spacing={6}>
                        <Icon as={FaCheckCircle} boxSize={16} color="gray.400" />
                        <VStack spacing={2}>
                          <Text color={textColor} fontSize="xl" fontWeight="semibold">
                            No completed orders
                          </Text>
                          <Text color={subTextColor} fontSize="lg" textAlign="center">
                            Completed orders will appear here once you finish trading
                          </Text>
                        </VStack>
                      </VStack>
                    </Center>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                      {completedOrders.map((order, index) => (
                        <Fade in={true} delay={index * 0.1} key={order.id}>
                          <OrderCard
                            order={order}
                            onActionComplete={handleActionComplete}
                          />
                        </Fade>
                      ))}
                    </SimpleGrid>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Fade>
      </VStack>
    </Box>
  );
};

export default BuyerView; 