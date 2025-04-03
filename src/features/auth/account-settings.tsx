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

const AccountSettings = () => {
  return (
    <>
      <Stack>
        <Title>Account Settings</Title>
        <Flex justify={"center"}>
          <Paper shadow="xl" px={"xl"} py={'md'} w={400} radius={'lg'}>
            <Stack>
              <Flex justify={"center"}>
                <Stack gap={"xs"}>
                  <Group justify="center">
                    <Avatar size={"xl"} />
                  </Group>
                  <FileInput
                    placeholder="Change  Ava..."
                    size="xs"
                    radius={"xl"}
                  />
                </Stack>
              </Flex>


              <TextInput label='Name'/>
              <TextInput label='Email'/>
              <TextInput label='Password'/>
              <TextInput label='Confirm Password'/>
              <Button>Update</Button>

            </Stack>
          </Paper>
        </Flex>
      </Stack>
    </>
  );
};
export default AccountSettings;
