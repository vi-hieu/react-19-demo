import { Card, Group, Skeleton, Stack } from '@mantine/core';

export const UseOptimisticSkeleton = () => {
  return (
    <Stack gap='lg'>
      <Card
        withBorder
        bg='gray.0'
        padding='md'
        radius='md'
      >
        <Stack gap='md'>
          <Skeleton
            height={20}
            width='15%'
          />
          <Skeleton
            height={36}
            width='100%'
          />
          <Skeleton
            height={16}
            width='60%'
          />
        </Stack>
      </Card>
      <Stack gap='sm'>
        {[1, 2, 3, 4, 5].map(i => (
          <Card
            key={i}
            withBorder
            padding='md'
            radius='md'
          >
            <Group
              gap='md'
              justify='space-between'
            >
              <Group gap='md'>
                <Skeleton
                  circle
                  height={36}
                  width={36}
                />
                <Skeleton
                  height={20}
                  width={200}
                />
              </Group>
              <Skeleton
                circle
                height={36}
                width={36}
              />
            </Group>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};
