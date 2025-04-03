import {
  Box,
  Card,
  Flex,
  Stack,
  Title,
  Text,
  TextInput,
  NumberInput,
  FileInput,
  FileButton,
  Button,
  useSafeMantineTheme,
  ActionIcon,
  Grid,
  Avatar,
  Select,
  Chip,
  Group,
  Radio,
} from "@mantine/core";
import IconHomeEdit from "../../assets/IconHomeEdit";
import { useState } from "react";
import IconPlus from "../../assets/IconPlus";
import IconLocation from "../../assets/IconLocation";
import IconService from "../../assets/IconService";
import { TimeInput } from "@mantine/dates";
import IconCalendar from "../../assets/IconCalendar";
import IconBrand from "../../assets/IconBrand";

const WorkshopSettings = () => {
  const [state, setState] = useState("");
  return (
    <>
      <Stack px={"xl"}>
        <Title>Workshop Settings</Title>
        <Card>
          <Flex gap={"40px"}>
            <Stack gap={"2px"}>
              <Flex
                h={60}
                w={60}
                bg={"#f4f5f7"}
                style={{
                  borderRadius: "12px",
                }}
                justify={"center"}
                align={"center"}
              >
                <IconHomeEdit />
              </Flex>
              <Text fw={700}>Basic Information</Text>
            </Stack>
            <Card>
              <Stack>
                <Flex gap={"md"}>
                  <Avatar size={"xl"}></Avatar>
                  <Flex align={'center'}>
                    <FileInput w={140} placeholder="Add Logo" />
                  </Flex>
                </Flex>
                <TextInput
                  label="Enter Name of your workshop"
                  placeholder="e.g Saad Automotive"
                  size="sm"
                  w={250}
                />
                <Select
                  label="Workshop Type"
                  placeholder="Select Workshop Type"
                  data={[
                    { value: "bike", label: "Bike Workshop" },
                    { value: "car", label: "Car Workshop" },
                    { value: "truck", label: "Truck Workshop" },
                    { value: "bus", label: "Bus Workshop" },
                    { value: "all_vehicles", label: "All Vehicles Workshop" },
                  ]}
                  searchable
                  clearable
                  required
                />
                <NumberInput
                  label="Contact Number"
                  placeholder="e.g 03000000000"
                  size="sm"
                  w={250}
                  hideControls
                />
              </Stack>
            </Card>
          </Flex>
        </Card>
        <Card>
          <Flex gap={"110px"}>
            <Stack gap={"2px"}>
              <Flex
                h={60}
                w={60}
                bg={"#f4f5f7"}
                style={{
                  borderRadius: "12px",
                }}
                justify={"center"}
                align={"center"}
              >
                <IconLocation height="24" width="24"/>
              </Flex>
              <Text fw={700}>Address</Text>
            </Stack>
            <Card>
              <Stack>
                <Select
                  data={[
                    "Multan",
                    "Lahore",
                    "Islamabad",
                    "Karachi",
                    "Rawalpindi",
                    "Faisalabad",
                  ]}
                  label="Select City"
                  placeholder="e.g Islamabad"
                  w={250}

                ></Select>
                <TextInput
                  label="Enter Complete Address"
                  placeholder="e.g Street 5, G-11/3, Islamabad"
                />
              </Stack>
            </Card>
          </Flex>
        </Card>
        <Card>
          <Flex gap={"100px"}>
            <Stack gap={"2px"}>
              <Flex
                h={60}
                w={60}
                bg={"#f4f5f7"}
                style={{
                  borderRadius: "12px",
                }}
                justify={"center"}
                align={"center"}
              >
                <IconBrand stroke = 'green'/>
              </Flex>
              <Text fw={700}>Services</Text>
            </Stack>
            <Card>
              <Stack gap={'xl'}>
                <Box>
                <Text fw={500}>Select Services</Text>
                  <Chip.Group multiple >
                    <Flex gap={"md"}>
                      <Chip value="engine">Engine Repair</Chip>
                      <Chip value="brakes">Brakes</Chip>
                      <Chip value="ac">AC Repair</Chip>
                      <Chip value="oil">Oil Change</Chip>
                      <Chip value="tire">Tire Change & Alignment</Chip>
                    </Flex>
                    <Flex mt={8} gap={"md"}>
                      <Chip value="battery">Battery Replacement</Chip>
                      <Chip value="bodywork">Bodywork & Painting</Chip>
                      <Chip value="roadside">
                        Emergency Roadside Assistance
                      </Chip>
                    </Flex>
                  </Chip.Group>
                </Box>

                <Box>
                  <Text fw={500}>Spare Parts Availability</Text>
                  <Radio.Group required>
                    <Flex gap={"xl"}>
                      <Radio value="yes" label="Yes" defaultChecked={true} />
                      <Radio value="no" label="No" />
                    </Flex>
                  </Radio.Group>
                </Box>
                <Box>
                  <Text fw={500}>Service Mode</Text>
                  <Radio.Group required>
                    <Flex gap={"xl"}>
                      <Radio
                        value="workshop_only"
                        label="Workshop Only"
                        defaultChecked
                      />
                      <Radio value="mobile_service" label="Mobile Service" />
                      <Radio value="both" label="Both (Workshop & Mobile)" />
                    </Flex>
                  </Radio.Group>
                </Box>
              </Stack>
            </Card>
          </Flex>
        </Card>
        <Card>
          <Flex gap={"100px"}>
            <Stack gap={"2px"}>
              <Flex
                h={60}
                w={60}
                bg={"#f4f5f7"}
                style={{
                  borderRadius: "12px",
                }}
                justify={"center"}
                align={"center"}
              >
                <IconCalendar height="24" width="24"/>
              </Flex>
              <Text fw={700}>Operating </Text>
              <Text fw={700}>Schedule </Text>


            </Stack>
            <Card>
              <Stack>
                <Box>
                  <Text fw={500}>Select Working Days</Text>

                  <Chip.Group multiple>
                    <Stack gap={"xs"}>
                      <Flex gap={"xl"}>
                        <Chip value="monday">Monday</Chip>
                        <Chip value="tuesday">Tuesday</Chip>
                        <Chip value="wednesday">Wednesday</Chip>
                        <Chip value="thursday">Thursday</Chip>
                      </Flex>
                      <Flex gap={"xl"}>
                        <Chip value="friday">Friday</Chip>
                        <Chip value="saturday">Saturday</Chip>
                        <Chip value="sunday">Sunday</Chip>
                      </Flex>
                    </Stack>
                  </Chip.Group>
                </Box>

                <TimeInput label="Opening Time" required w={250}/>
                <TimeInput label="Closing Time" required w={250}/>
              </Stack>
            </Card>
          </Flex>
        </Card>
        <Group justify="end">
          <Button>Submit</Button>
        </Group>
      </Stack>
    </>
  );
};
export default WorkshopSettings;
