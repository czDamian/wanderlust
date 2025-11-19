import { Destination } from '@/types/destination';

export const createGoogleCalendarUrl = (destination: Destination) => {
  const { name, description, startDate, endDate, location } = destination;

  const formatTime = (dateStr: string) => dateStr.replace(/-/g, '');

  const start = formatTime(startDate);
  const end = formatTime(endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Trip to ${name}`,
    dates: `${start}/${end}`,
    details: description,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
