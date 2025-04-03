import {
  Box,
  Button,
  Card,
  Text,
  Center,
  Flex,
  Stack,
  Title,
  Image,
  Container,
  PinInput,
  Group,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import api from "../../api";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../common/logo";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const {state} = useLocation()
  const isSmallScreen = useMediaQuery("(max-width: 56.25em)");
  const validateSchema = yup.object({
    otp: yup
      .string()
      .matches(/^\d{6}$/, "OTP must be a 6-digit number")
      .required("OTP is required"),
  });

  const form = useForm({
    initialValues: {
      otp: "",
    },
    validate: yupResolver(validateSchema),
  });
  async function handleSubmit() {
    const response = await api.post("/auth/verify-otp", {
      ...form.values,
      email:state.email
    });
    if (response.data) {
      navigate("/reset-password", {
        state: {
          email: state.email,
          otp:form.values.otp
        },
      });
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
                Remeber account?
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
                              </Flex>s
                <Stack gap={8} >
                  <Title fw={600} fz={25} ta={"center"}>
                    Forgot <span style={{ color: "#2A8C82" }}>Password</span>
                  </Title>
                  <Text ta={"center"} fw={400} fz={21}>
                    Enter otp to recover your account
                  </Text>
                </Stack>
                <form onSubmit={form.onSubmit(() => handleSubmit())}>
                  <Stack gap={13} mt={7}>
                    <Flex w={"100%"} justify="center">
                      <PinInput
                        length={6}
                        size="md"
                        radius={16}
                        {...form.getInputProps("otp")}
                      />
                    </Flex>

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
export default VerifyOtp;
