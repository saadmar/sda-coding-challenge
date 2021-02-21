import { Meeting, Person } from '../_models';

interface groupedByDate {
  date: Date;
  meetings: Meeting[];
}
interface groupedByPerson {
  person: Person;
  meetings: Meeting[];
}
// for type safety in our array
type MeetingDataSource = groupedByPerson | groupedByDate | Meeting;
