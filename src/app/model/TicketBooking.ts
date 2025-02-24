import { Attendee } from "./Attendee";

export class TicketBooking {
    public bookingDate: string;
    public transactionId: string;
    public transactionMode: string;
    public totalCost: number;
    public status: string;
    public attendeeId:number
    // public attendee: Attendee = new Attendee();
    public event: number;
}