import React from 'react';
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
  Badge,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Fade,
  ScaleFade,
  Divider
} from '@chakra-ui/react';
import { useWeb3 } from '../contexts/Web3Context';
import { useOrders } from '../hooks/useOrders';
import OrderCard from './OrderCard';
import { FaRedo, FaStore, FaWallet, FaChartLine, FaClock, FaCheckCircle, FaExclamationTriangle, FaArrowDown, FaArrowUp, FaInfoCircle } from 'react-icons/fa';

const MerchantView = () => {
  const { account, isConnected } = useWeb3();
  const { orders, orderCount, getMerchantOrders, isLoading, fetchOrders } = useOrders();
  
  const bg = useColorModeValue('gray.50', 'transparent');
  const cardBg = useColorModeValue('white', 'rgba(26, 26, 46, 0.8)');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.1)');

  const merchantOrders = getMerchantOrders();
  
  const pendingOrders = merchantOrders.filter(order => order.status < 2);
  const completedOrders = merchantOrders.filter(order => order.status === 2);
  
  // Filter by order type for better organization
  const buyOrders = pendingOrders.filter(order => order.orderType === 0);
  const sellOrders = pendingOrders.filter(order => order.orderType === 1);

  const handleActionComplete = () => {
    fetchOrders();
  };

  if (!isConnected) {
    return (
      <Center py={20}>
        <Fade in={true}>
          <VStack spacing={8} maxW="600px" mx="auto" px={6}>
            <Box
              bg={cardBg}
              p={12}
              borderRadius="2xl"
              shadow="xl"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor={borderColor}
              textAlign="center"
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
              <VStack spacing={6}>
                <Icon as={FaWallet} boxSize={20} color="brand.400" />
                <VStack spacing={4}>
                  <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                    Wallet Not Connected
                  </Text>
                  <Text color={subTextColor} fontSize="lg" maxW="md" lineHeight="tall">
                    Please connect your wallet to view and manage your merchant orders. 
                    Connect to start accepting buy orders and creating sell offers.
                  </Text>
                </VStack>
                <Button
                  size="lg"
                  colorScheme="blue"
                  leftIcon={<Icon as={FaWallet} />}
                  borderRadius="xl"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="semibold"
                  bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
                  _hover={{
                    bgGradient: "linear(to-r, brand.300, brand.400, brand.500)",
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                  }}
                  transition="all 0.2s"
                  onClick={() => window.location.reload()}
                >
                  Connect Wallet
                </Button>
              </VStack>
            </Box>
          </VStack>
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
                <Icon as={FaStore} color="brand.400" boxSize={8} />
                <VStack align="start" spacing={1}>
                  <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                    Merchant Dashboard
                  </Text>
                  <Text color={subTextColor} fontSize="lg">
                    Manage incoming buy orders and your sell orders
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            
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
          </HStack>
        </Fade>

        {/* Quick Stats */}
        <Fade in={true}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
            <Stat
              bg={cardBg}
              p={6}
              borderRadius="2xl"
              shadow="xl"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
              textAlign="center"
            >
              <StatLabel color={subTextColor} fontSize="sm" fontWeight="semibold">
                <Icon as={FaArrowDown} color="blue.400" mr={2} />
                Incoming Buy Orders
              </StatLabel>
              <StatNumber color="blue.400" fontSize="3xl">
                {buyOrders.length}
              </StatNumber>
              <StatHelpText color={subTextColor}>
                From customers
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
              textAlign="center"
            >
              <StatLabel color={subTextColor} fontSize="sm" fontWeight="semibold">
                <Icon as={FaArrowUp} color="purple.400" mr={2} />
                Outgoing Sell Orders
              </StatLabel>
              <StatNumber color="purple.400" fontSize="3xl">
                {sellOrders.length}
              </StatNumber>
              <StatHelpText color={subTextColor}>
                Your offers
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
              textAlign="center"
            >
              <StatLabel color={subTextColor} fontSize="sm" fontWeight="semibold">
                <Icon as={FaCheckCircle} color="green.400" mr={2} />
                Completed Orders
              </StatLabel>
              <StatNumber color="green.400" fontSize="3xl">
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
              textAlign="center"
            >
              <StatLabel color={subTextColor} fontSize="sm" fontWeight="semibold">
                <Icon as={FaChartLine} color="brand.400" mr={2} />
                Total Orders
              </StatLabel>
              <StatNumber color="brand.400" fontSize="3xl">
                {merchantOrders.length}
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
                  {merchantOrders.length} Total
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
                    color: 'blue.400',
                    borderColor: 'blue.400',
                    bg: 'rgba(59, 130, 246, 0.1)'
                  }}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <HStack spacing={2}>
                    <Icon as={FaArrowDown} />
                    <Text>Buy Orders</Text>
                    <Badge colorScheme="blue" variant="subtle" borderRadius="full">
                      {buyOrders.length}
                    </Badge>
                    <Badge colorScheme="blue" variant="outline" fontSize="xs">
                      Incoming
                    </Badge>
                  </HStack>
                </Tab>
                <Tab 
                  color={textColor}
                  _selected={{ 
                    color: 'purple.400',
                    borderColor: 'purple.400',
                    bg: 'rgba(147, 51, 234, 0.1)'
                  }}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <HStack spacing={2}>
                    <Icon as={FaArrowUp} />
                    <Text>Sell Orders</Text>
                    <Badge colorScheme="purple" variant="subtle" borderRadius="full">
                      {sellOrders.length}
                    </Badge>
                    <Badge colorScheme="purple" variant="outline" fontSize="xs">
                      Outgoing
                    </Badge>
                  </HStack>
                </Tab>
                <Tab 
                  color={textColor}
                  _selected={{ 
                    color: 'green.400',
                    borderColor: 'green.400',
                    bg: 'rgba(34, 197, 94, 0.1)'
                  }}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <HStack spacing={2}>
                    <Icon as={FaCheckCircle} />
                    <Text>Completed</Text>
                    <Badge colorScheme="green" variant="subtle" borderRadius="full">
                      {completedOrders.length}
                    </Badge>
                  </HStack>
                </Tab>
              </TabList>

              <TabPanels p={6}>
                {/* Buy Orders (Incoming) */}
                <TabPanel p={0}>
                  {isLoading ? (
                    <Center py={20}>
                      <VStack spacing={4}>
                        <Spinner size="xl" color="brand.400" />
                        <Text color={subTextColor}>Loading orders...</Text>
                      </VStack>
                    </Center>
                  ) : buyOrders.length === 0 ? (
                    <Center py={20}>
                      <VStack spacing={6}>
                        <Icon as={FaArrowDown} boxSize={16} color="gray.400" />
                        <VStack spacing={2}>
                          <Text color={textColor} fontSize="xl" fontWeight="semibold">
                            No incoming buy orders
                          </Text>
                          <Text color={subTextColor} fontSize="lg" textAlign="center">
                            Buy orders from customers will appear here
                          </Text>
                        </VStack>
                      </VStack>
                    </Center>
                  ) : (
                    <VStack spacing={6} align="stretch">
                      <Box 
                        bg="rgba(59, 130, 246, 0.1)" 
                        p={4} 
                        borderRadius="xl" 
                        border="1px solid rgba(59, 130, 246, 0.2)"
                      >
                        <Text fontSize="sm" color={textColor} textAlign="center">
                          <Icon as={FaInfoCircle} mr={2} />
                          These are buy orders where customers want to purchase from you. 
                          Confirm when you receive their payment.
                        </Text>
                      </Box>
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {buyOrders.map((order, index) => (
                          <Fade in={true} delay={index * 0.1} key={order.id}>
                            <OrderCard
                              order={order}
                              onActionComplete={handleActionComplete}
                            />
                          </Fade>
                        ))}
                      </SimpleGrid>
                    </VStack>
                  )}
                </TabPanel>

                {/* Sell Orders (Outgoing) */}
                <TabPanel p={0}>
                  {isLoading ? (
                    <Center py={20}>
                      <VStack spacing={4}>
                        <Spinner size="xl" color="brand.400" />
                        <Text color={subTextColor}>Loading orders...</Text>
                      </VStack>
                    </Center>
                  ) : sellOrders.length === 0 ? (
                    <Center py={20}>
                      <VStack spacing={6}>
                        <Icon as={FaArrowUp} boxSize={16} color="gray.400" />
                        <VStack spacing={2}>
                          <Text color={textColor} fontSize="xl" fontWeight="semibold">
                            No outgoing sell orders
                          </Text>
                          <Text color={subTextColor} fontSize="lg" textAlign="center">
                            Create sell orders to offer your products/services
                          </Text>
                        </VStack>
                      </VStack>
                    </Center>
                  ) : (
                    <VStack spacing={6} align="stretch">
                      <Box 
                        bg="rgba(147, 51, 234, 0.1)" 
                        p={4} 
                        borderRadius="xl" 
                        border="1px solid rgba(147, 51, 234, 0.2)"
                      >
                        <Text fontSize="sm" color={textColor} textAlign="center">
                          <Icon as={FaInfoCircle} mr={2} />
                          These are sell orders you've created. Mark as paid when you receive payment.
                        </Text>
                      </Box>
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {sellOrders.map((order, index) => (
                          <Fade in={true} delay={index * 0.1} key={order.id}>
                            <OrderCard
                              order={order}
                              onActionComplete={handleActionComplete}
                            />
                          </Fade>
                        ))}
                      </SimpleGrid>
                    </VStack>
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
                            Completed orders will appear here
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

        {/* Order Flow Information */}
        <Fade in={true}>
          <Box 
            bg={cardBg} 
            p={8} 
            borderRadius="2xl" 
            shadow="xl"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
          >
            <VStack spacing={6} align="stretch">
              <HStack spacing={3}>
                <Icon as={FaInfoCircle} color="brand.400" boxSize={6} />
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                  How P2P Orders Work
                </Text>
              </HStack>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <VStack align="start" spacing={4}>
                  <HStack spacing={3}>
                    <Icon as={FaArrowDown} color="blue.400" boxSize={5} />
                    <Text fontWeight="bold" color="blue.400" fontSize="lg">
                      Buy Orders (Incoming)
                    </Text>
                  </HStack>
                  <VStack align="start" spacing={2} pl={8}>
                    <Text fontSize="sm" color={subTextColor}>
                      1. Customer creates buy order with your address
                    </Text>
                    <Text fontSize="sm" color={subTextColor}>
                      2. Customer marks payment as sent
                    </Text>
                    <Text fontSize="sm" color={subTextColor}>
                      3. You confirm payment received
                    </Text>
                    <Text fontSize="sm" color={subTextColor}>
                      4. Either party can complete the order
                    </Text>
                  </VStack>
                </VStack>
                <VStack align="start" spacing={4}>
                  <HStack spacing={3}>
                    <Icon as={FaArrowUp} color="purple.400" boxSize={5} />
                    <Text fontWeight="bold" color="purple.400" fontSize="lg">
                      Sell Orders (Outgoing)
                    </Text>
                  </HStack>
                  <VStack align="start" spacing={2} pl={8}>
                    <Text fontSize="sm" color={subTextColor}>
                      1. You create sell order with customer address
                    </Text>
                    <Text fontSize="sm" color={subTextColor}>
                      2. You mark payment as sent
                    </Text>
                    <Text fontSize="sm" color={subTextColor}>
                      3. Customer confirms payment received
                    </Text>
                    <Text fontSize="sm" color={subTextColor}>
                      4. Either party can complete the order
                    </Text>
                  </VStack>
                </VStack>
              </SimpleGrid>
            </VStack>
          </Box>
        </Fade>
      </VStack>
    </Box>
  );
};

export default MerchantView; 