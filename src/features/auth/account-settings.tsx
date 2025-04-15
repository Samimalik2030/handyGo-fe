import {
  Avatar,
  Box,
  Button,
  Card,
  FileInput,
  Flex,
  Group,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { IUser } from "../../common/interfaces/user";
import api from "../../api";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  password: yup.string().optional(),
  newPassword: yup
    .string().optional(),
  
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .when("newPassword", {
      is: (val: string) => val && val.length > 0,
      then: (schema) => schema.required("Confirm your new password"),
    }),
});

const AccountSettings = () => {
  const [user, setUser] = useState<IUser | null>(null);
    const [file, setFile] = useState({
      fileId: "",
      url: "",
    });

  const form = useForm({
    initialValues: {
      name: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: yupResolver(schema),
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: IUser = JSON.parse(storedUser);
      setUser(parsedUser);
      form.setFieldValue("name", parsedUser.name);
    }
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const updatedUser = await api.patch("/auth/update-profile", {
        name: values.name,
        password: values.password,
        newPassword: values.newPassword || undefined,
      });

      localStorage.setItem("user", JSON.stringify(updatedUser.data));
   
    } catch (error) {
      console.error("Update failed", error);
    
    }
  };
  async function handleUploadImage(file: any) {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await api.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const updatedUserResponse = await api.patch("/auth/update-profile", {
        profileImage: response.data,
      });
  
      const updatedUser = updatedUserResponse.data.user;
  
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser); // this triggers re-render
  
      form.setFieldValue("profileImage", updatedUser.profileImage); // optional: update form image state if needed
    } catch (error) {
      console.error("Error uploading image", error);
    }
  }
  
  return (
    <Stack>
      <Title>Account Settings</Title>
      <Flex justify={"center"}>
        <Paper shadow="xl" px={"xl"} py={"md"} w={400} radius={"lg"}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <Flex justify={"center"}>
                <Stack gap={"xs"}>
                  <Group justify="center">
                    <Avatar
                      size={"xl"}
                      src={user?.profileImage?.url || file.url}
                    />
                  </Group>
                  <FileInput
                    placeholder="Change Avatar"
                    size="xs"
                    radius={"xl"}
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(file) => handleUploadImage(file)}

          
                  />
                </Stack>
              </Flex>

              <TextInput label="Name" {...form.getInputProps("name")} />
              <TextInput
                label="Password"
                type="password"
                placeholder="Enter current password"
                {...form.getInputProps("password")}
              />
              <TextInput
                label="New Password"
                type="password"
                placeholder="*************"
                {...form.getInputProps("newPassword")}
              />
              <TextInput
                label="Confirm Password"
                type="password"
                placeholder="*************"
                {...form.getInputProps("confirmPassword")}
              />
              <Button type="submit">Update</Button>
            </Stack>
          </form>
        </Paper>
      </Flex>
    </Stack>
  );
};

export default AccountSettings;
