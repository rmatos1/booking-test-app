import moment from 'moment';
import { getDifferenceDates } from '../../helpers';
import { IConfirmedBooking } from '../../types';
import {
  Table,
  TableTitle,
  TdData,
  TdDescription,
} from './bookingDescription.styles';

export interface IBookingDescription {
  title?: string;
  data: IConfirmedBooking;
  isLeftAligned?: boolean;
}

/**
 * component to show the details of a confirmed booking
 * @param props.title - when it's necessary to show a title
 * @param props.data - all the data related to the booking
 * @param props.isLeftAligned - define if all the texts in the first column will be aligned on the left (pattern: aligned on the right)
 */
export const BookingDescription = ({
  title,
  data,
  isLeftAligned,
}: IBookingDescription) => {
  return (
    <Table>
      {title && (
        <thead>
          <tr>
            <TableTitle colSpan={2}>{title}</TableTitle>
          </tr>
        </thead>
      )}

      <tbody>
        <tr>
          <TdDescription $isLeftAligned={isLeftAligned}>Name:</TdDescription>
          <TdData data-testid="name">{data.name}</TdData>
        </tr>

        <tr>
          <TdDescription $isLeftAligned={isLeftAligned}>Email:</TdDescription>
          <TdData data-testid="email">{data.email}</TdData>
        </tr>

        <tr>
          <TdDescription $isLeftAligned={isLeftAligned}>Period:</TdDescription>
          <TdData data-testid="period">
            {moment(data.checkIn).format('MM/DD/YYYY')} -{' '}
            {moment(data.checkOut).format('MM/DD/YYYY')}
          </TdData>
        </tr>

        <tr>
          <TdDescription $isLeftAligned={isLeftAligned}>
            Qty of Nights:
          </TdDescription>
          <TdData>{getDifferenceDates(data.checkIn, data.checkOut)}</TdData>
        </tr>

        <tr>
          <TdDescription $isLeftAligned={isLeftAligned}>
            Bedroom nº:
          </TdDescription>
          <TdData data-testid="bedroom-number">{data.selectedBedroom}</TdData>
        </tr>

        <tr>
          <TdDescription $isLeftAligned={isLeftAligned}>
            Qty of Guests:
          </TdDescription>
          <TdData data-testid="qty-guests">{data.qtyGuests}</TdData>
        </tr>

        <tr>
          <TdDescription $isLeftAligned={isLeftAligned}>
            Total Price:
          </TdDescription>
          <TdData data-testid="total-price">$ {data.totalPrice}</TdData>
        </tr>
      </tbody>
    </Table>
  );
};
