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
  Group,
  Anchor,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import api from "../../api";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../common/logo";
import { useState } from "react";

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 56.25em)");
  const [loading, setLoading] = useState<boolean>(false);

  const validateSchema = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: yupResolver(validateSchema),
  });
  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await api.post("/auth/reset-password", {
        password: form.values.password,
        otp: state.otp,
        email: state.email,
      });
      setLoading(false);
      if (response.data) {
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
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
                Remeber Password?
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
                <Flex justify={"center"}>
                  <Logo />
                </Flex>
                <Stack gap={8}>
                  <Title fw={600} fz={25} ta={"center"}>
                    Reset <span style={{ color: "#2A8C82" }}>Password</span>
                  </Title>
                  <Text ta={"center"} fw={400} fz={21}>
                    Reset your password to recover your account
                  </Text>
                </Stack>
                <form onSubmit={form.onSubmit(() => handleSubmit())}>
                  <Stack gap={13} mt={7}>
                    <TextInput
                      fw={300}
                      fz={9}
                      c={"#6d7572"}
                      label=" Password"
                      placeholder="Enter Your Password"
                      size="md"
                      w={"100%"}
                      radius={16}
                      {...form.getInputProps("password")}
                    />
                    <TextInput
                      fw={300}
                      fz={9}
                      c={"#6d7572"}
                      label=" Password"
                      placeholder="Enter Your confirm Password"
                      size="md"
                      w={"100%"}
                      radius={16}
                      {...form.getInputProps("confirmPassword")}
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
                      loading={loading}
                    >
                      Reset
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
export default ResetPassword;
