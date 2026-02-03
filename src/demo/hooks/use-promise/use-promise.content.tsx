import { use } from 'react';

import { Avatar, Badge, Card, Group, Stack, Text, Title } from '@mantine/core';

import type { User } from '../../../api/user/user.types';

interface UsePromiseContentProps {
  userPromise: Promise<User>;
}

export const UsePromiseContent = ({ userPromise }: UsePromiseContentProps) => {
  const data = use(userPromise);

  return (
    <Stack
      className='max-w-prose'
      gap='md'
    >
      <Card
        withBorder
        padding='lg'
        radius='md'
        shadow='sm'
      >
        <Group
          gap='md'
          mb='md'
        >
          <Avatar
            alt={`${data.firstName} ${data.lastName}`}
            radius='md'
            size={80}
            src={data.image}
          />
          <div>
            <Title order={3}>
              {data.firstName} {data.lastName}
            </Title>
            <Text
              c='dimmed'
              size='sm'
            >
              @{data.username}
            </Text>
            <Group
              gap='xs'
              mt='xs'
            >
              <Badge
                color='blue'
                variant='light'
              >
                {data.role}
              </Badge>
              <Badge
                color='gray'
                variant='light'
              >
                {data.gender}
              </Badge>
              <Badge
                color='green'
                variant='light'
              >
                {data.age} years
              </Badge>
            </Group>
          </div>
        </Group>

        <Stack gap='sm'>
          <div>
            <Text
              fw={600}
              mb={4}
              size='sm'
            >
              Contact Information
            </Text>
            <Text
              c='dimmed'
              size='sm'
            >
              📧 {data.email}
            </Text>
            <Text
              c='dimmed'
              size='sm'
            >
              📱 {data.phone}
            </Text>
          </div>

          <div>
            <Text
              fw={600}
              mb={4}
              size='sm'
            >
              Address
            </Text>
            <Text
              c='dimmed'
              size='sm'
            >
              {data.address.address}, {data.address.city}, {data.address.state} {data.address.postalCode}
            </Text>
            <Text
              c='dimmed'
              size='sm'
            >
              {data.address.country}
            </Text>
          </div>

          <div>
            <Text
              fw={600}
              mb={4}
              size='sm'
            >
              Company
            </Text>
            <Text
              c='dimmed'
              size='sm'
            >
              {data.company.title} at {data.company.name}
            </Text>
            <Text
              c='dimmed'
              size='sm'
            >
              Department: {data.company.department}
            </Text>
          </div>

          <div>
            <Text
              fw={600}
              mb={4}
              size='sm'
            >
              Additional Info
            </Text>
            <Text
              c='dimmed'
              size='sm'
            >
              🎓 {data.university}
            </Text>
            <Text
              c='dimmed'
              size='sm'
            >
              💇 {data.hair.color} {data.hair.type} hair, {data.eyeColor} eyes
            </Text>
            <Text
              c='dimmed'
              size='sm'
            >
              📏 {data.height}cm, {data.weight}kg
            </Text>
          </div>
        </Stack>
      </Card>
    </Stack>
  );
};
