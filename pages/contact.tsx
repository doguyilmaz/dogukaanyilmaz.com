import { ChangeEvent, SyntheticEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import Layout from "components/Layout";
import useLocale from "hooks/useLocale";
import axios from "axios";
import {
  Box,
  Button,
  ButtonGroup,
  ChakraProvider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function Contact({ cookies }: any) {
  const { t } = useLocale();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>([]);

  const handleSubmit = async () => {
    if (validateField()) {
      setSubmitted(true);
      try {
        const { data } = await axios.post("http://localhost:3000/api/mail", form);
        console.log(data);
        if (data.success) {
          toast({
            position: "top-right",
            title: data.message,
            description: (
              <span>
                Thanks for reaching to me.<br></br> I will be responsing to you ASAP.
              </span>
            ),
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          onClose();
          setForm({ name: "", email: "", message: "" });
          setSubmitted(false);
        } else {
          throw new Error("Internal error. Try again later.");
        }
      } catch (error) {
        toast({
          position: "top-right",
          title: "Error",
          description: "Please try again later.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const validateField = () => {
    let error = [];
    if (!form.name) {
      error.push({ key: "name", message: "Name is required!" });
    }
    if (!form.email) {
      error.push({ key: "email", message: "Email is required!" });
    }
    if (!form.message) {
      error.push({ key: "message", message: "Message is required!" });
    }
    setErrors(error);
    error.length > 0 &&
      toast({
        position: "top-right",
        title: "Error",
        description: "Fill all the required fields.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    return error.length > 0 ? false : true;
  };

  return (
    <Layout pageTitle="Contact">
      <Box d="flex" justifyContent="center" alignItems="center" h="95vh">
        <Stack direction="row" spacing={4}>
          <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
            Email
          </Button>
          <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" variant="outline" onClick={onOpen}>
            Contact Me
          </Button>
        </Stack>
      </Box>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                isInvalid={errors.find((item: any) => item.key === "name")}
                focusBorderColor="teal.500"
                value={form.name}
                placeholder="Name"
                disabled={isSubmitted}
                onChange={handleChange}
              />
              <FormHelperText color="red.300">
                {errors.find((item: any) => item.key === "name")?.message}
              </FormHelperText>
            </FormControl>

            <FormControl id="email" mt={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                isInvalid={errors.find((item: any) => item.key === "email")}
                focusBorderColor="teal.500"
                value={form.email}
                type="email"
                disabled={isSubmitted}
                onChange={handleChange}
              />
              <FormHelperText color="red.300">
                {errors.find((item: any) => item.key === "email")?.message}
              </FormHelperText>
            </FormControl>

            <FormControl id="message" mt={4} isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                isInvalid={errors.find((item: any) => item.key === "message")}
                focusBorderColor="teal.500"
                value={form.message}
                placeholder="Message"
                disabled={isSubmitted}
                size="sm"
                resize="none"
                onChange={handleChange}
              />{" "}
              <FormHelperText color="red.300">
                {errors.find((item: any) => item.key === "message")?.message}
              </FormHelperText>
            </FormControl>

            <FormControl as="fieldset" id="emerg" mt={4} disabled={isSubmitted}>
              <FormLabel as="legend">Emergency</FormLabel>
              <RadioGroup defaultValue="low">
                <HStack spacing="24px">
                  <Radio colorScheme="teal" value="low">
                    Low
                  </Radio>
                  <Radio colorScheme="teal" value="medium">
                    Medium
                  </Radio>
                  <Radio colorScheme="teal" value="high">
                    High
                  </Radio>
                </HStack>
              </RadioGroup>
              <FormHelperText>Select if necessity.</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button disabled={isSubmitted} onClick={onClose} colorScheme="red" mr={3} variant="ghost">
              Cancel
            </Button>
            <Button
              isLoading={isSubmitted}
              colorScheme="teal"
              variant={isSubmitted ? "solid" : "outline"}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}