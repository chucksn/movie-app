import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Image,
  AspectRatio,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AiFillCaretRight } from "react-icons/ai";

function MovieDetailModal() {
  const { onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    dispatch({ type: "CARD_CLICK_RESET" });
  };

  return (
    <Modal
      isOpen={onOpen}
      onClose={handleClose}
      size={{ base: "xl", md: "2xl", lg: "4xl", xl: "6xl" }}
    >
      <ModalOverlay bgColor="blackAlpha.50" />
      <ModalContent pt="0.5rem" pb="0.5rem" bgColor="gray.800">
        <ModalCloseButton color="gray.300" />
        <ModalBody>
          <Flex flexWrap={{ base: "wrap", lg: "nowrap" }}>
            <Image
              src="https://image.tmdb.org/t/p/w780/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
              alt="poster"
              maxW={{ base: "100%", lg: "400px" }}
            />
            <Flex direction="column" justify="space-around" w="100%" pl="1rem">
              <Box textAlign="center" w="100%" p="0.6rem">
                <Box
                  as="h1"
                  fontSize={{
                    base: "1.2rem",
                    md: "1.5rem",
                    lg: "2rem",
                    xl: "2.2rem",
                  }}
                  fontWeight="500"
                  fontFamily='"Ubuntu", sans-serif'
                  color="teal.400"
                >
                  MOVIE TITLE
                </Box>
                <Box
                  as="span"
                  fontSize={{
                    base: "1.2rem",
                    lg: "1.3rem",
                    xl: "1.5rem",
                  }}
                  fontWeight="500"
                  fontFamily="cursive"
                  color="yellow.400"
                >
                  Tagline
                </Box>
              </Box>
              <Box
                as="span"
                bgColor="gray.300"
                color="gray.700"
                p="0.6rem"
                borderRadius="0.9rem"
                fontSize={{ base: "1rem", lg: "1.2rem" }}
                fontWeight="500"
                scrollBehavior="inside"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                nam possimus dolore in quo natus ducimus magnam quasi! Sapiente
                quibusdam quaerat facilis aperiam numquam, odio rem omnis quam!
                Dolorem, eum. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Odio nam possimus dolore in quo natus ducimus magnam
                quasi! Sapiente quibusdam quaerat facilis aperiam numquam, odio
                rem omnis quam! Dolorem, eum.
              </Box>
              <Box></Box>
              <Button
                colorScheme="red"
                mt="0.6rem"
                w="100%"
                leftIcon={<AiFillCaretRight />}
              >
                WATCH TRAILER
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MovieDetailModal;
