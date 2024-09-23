import React from 'react'
import { Box, Image, Text, Heading, HStack, IconButton, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Button, ModalFooter, ModalBody } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product'
import { useToast } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'




const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdateProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };



    const handleUpdatedProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }


    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteProduct(product._id)}
                        colorScheme='red'
                    />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='product name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='product price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='product image'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })}

                            />

                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdatedProduct(product._id, updatedProduct)}>
                            Update
                        </Button>
                        <Button variant={"ghost"} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>


        </Box>
    );
};
export default ProductCard;