import {
  Box,
  Button,
  Card,
  Text,
  Center,
  Flex,
  Stack,
  TextInput,
  Title,
  Image,
  Container,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import api from "../../api";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import Logo from "../../common/logo";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 56.25em)");
  const validateSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  });
  const form = useForm({
    initialValues: {
      email: "",

    },
    validate: yupResolver(validateSchema),
  });
  async function handleSubmit() {
    const response = await api.post("/auth/forgot-password", form.values);
   if(response.data){
    navigate('/verify-otp',{
        state:{
            email:form.values.email
        }
    })
   }
  }

  return (
    <>
      <Container fluid h={"100vh"} w={"100vw"} p={10}>
        <Flex>
          <Card
            p={6}
            w={"50%"}
            h={"98vh"}
            display={isSmallScreen ? "none" : "block"}
          >
            <Image
              radius={20}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={
                "https://ik.imagekit.io/yzrrrgg3d/page.webp?updatedAt=1742744441337"
              }
            />
          </Card>

          <Card
            style={{
              background: "linear-gradient(to bottom, #eaffd1ff, #edfffd)",
              overflow: "auto",
            }}
            w={isSmallScreen ? "100%" : "50%"}
            h={"98vh"}
            radius={20}
          >
            <Flex justify={"end"} align={"center"} gap={15} px={20}>
              <Text fw={400} fz={16}>
                Remember account?
              </Text>
              <Button
                fw={600}
                fz={16}
                style={{ border: "1px solid #2A8C82" }}
                bg={"transparent"}
                c={"#2A8C82"}
                w={151}
                h={41}
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </Button>
            </Flex>
            <Center h={"100%"}>
              <Card w={"80%"} bg={"transparent"}>
              <Flex justify={"center"} >
                               <Logo/>
                              </Flex>
                <Stack gap={8} mt={10}>
                  <Title fw={600} fz={25} ta={"center"}>
                    Forgot <span style={{ color: "#2A8C82" }}>Password</span>
                  </Title>
                  <Text ta={"center"} fw={400} fz={21}>
                    Enter  email to recover your account
                  </Text>
                </Stack>
                <form onSubmit={form.onSubmit(() => handleSubmit())}>
                  <Stack gap={13} mt={7}>
                    <TextInput
                      fw={300}
                      fz={9}
                      c={"#6d7572"}
                      label="Your Email"
                      placeholder="Enter Your Email"
                      size="md"
                      w={"100%"}
                      radius={16}
                      {...form.getInputProps("email")}
                    />

                    <Button
                      fw={600}
                      fz={16}
                      w={"100%"}
                      mt={7}
                      h={42}
                      radius={16}
                      bg={"#2A8C82"}
                      type="submit"
                    >
                      Next
                    </Button>
                  </Stack>
                </form>
              </Card>
            </Center>
          </Card>
        </Flex>
      </Container>
    </>
  );
};
export default ForgotPassword;
