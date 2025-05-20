import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Stack,
  Title,
  Text,
  Skeleton,
  Rating,
  Box,
} from "@mantine/core";
import { IRating, Workshop } from "../../../common/interfaces/workshop";
import IconEye from "../../../assets/IconEye";
import IconLocation from "../../../assets/IconLocation";
import IconPhone from "../../../assets/IconPhone";
import { useEffect, useState } from "react";
import api from "../../../api";

export default function WorkshopDetails({ workshop }: { workshop: Workshop }) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [reviews, setReviews] = useState<IRating[]>([]);
  async function getReviews() {
    try {
      setIsFetching(true);
      const response = await api.get(`/ratings?workshopId:${workshop.id}`);
      if (response.data) {
        setReviews(response.data);
        setIsFetching(false);
      }
    } catch (error) {
      setIsFetching(false);
    }
  }
  useEffect(() => {
    getReviews();
  }, []);

  if (isFetching) {
    return (
      <>
        <Stack>
          <Skeleton height={50} circle animate />
          <Skeleton height={50} animate />
          <Skeleton height={50} animate />
        </Stack>
      </>
    );
  }

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        mt={12}
        pos={"relative"}
      >
        <Card.Section withBorder>
          <Flex h={150} align={"center"} px={"sm"} gap={"xl"}>
            <Stack>
              <Avatar size={"xl"} src={workshop?.logo?.url} />
            </Stack>
            <Stack h={"100%"} py={"xs"}>
              <Title
                order={4}
                c={"#40c057ff"}
                style={{
                  fontFamily: "cursive",
                }}
              >
                {workshop?.name}
              </Title>
              <Stack gap={2}>
                <Group gap={"xs"}>
                  <IconEye />
                  <Text c={"dimmed"}>{workshop?.workshopType}</Text>
                </Group>
                <Group gap={"xs"}>
                  <IconLocation height="20" width="20" />
                  <Text c={"dimmed"}>{workshop?.city}</Text>``
                </Group>
                <Group gap={"xs"}>
                  <IconPhone height="18" width="18" />
                  <Text c={"dimmed"}>{workshop?.contactNumber}</Text>
                </Group>
              </Stack>
            </Stack>
          </Flex>
        </Card.Section>
        <Stack>
          <Group justify="end">
            {/* <Badge color="green" variant="light" mt="sm" size="sm">
                     Available
                   </Badge> */}
          </Group>
          <Group justify="space-between">
            <Text>Timings</Text>
            <Text c={"dimmed"}>
              {workshop?.openingTime} to {workshop?.closingTime}
            </Text>
          </Group>
          <Group justify="space-between">
            <Text> Days</Text>
            <Flex gap={2}>
              {workshop?.workingDays.map((day) => (
                <Badge key={day} color="green" variant="light" size="xs">
                  {day}
                </Badge>
              ))}
            </Flex>
          </Group>

          <Text>Services :</Text>
          <Group>
            {workshop?.selectedServices.map((service) => (
              <Badge key={service} color="green" variant="light" size="sm">
                {service}
              </Badge>
            ))}
          </Group>
        </Stack>
        <Card.Section>
          <Box p={'xl'}>
            {reviews.map((rev) => (
              <Card withBorder>
                <Group>
                  <Avatar size={'lg'} src={rev?.user?.profileImage?.url}/>
                  <Stack gap={3}>
                    <Title order={4}>{rev?.user?.name}</Title>
                    <Rating value={rev.stars} />
                    <Text>{rev.comment}</Text>
                  </Stack>
                </Group>
              </Card>
            ))}
          </Box>
        </Card.Section>
      </Card>
    </>
  );
}
