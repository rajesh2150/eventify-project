

export class MyEvents {
    public eventId?: number;
    public eventTitle: string;
    public eventDescription: string;
    public eventStartTime: string;
    public eventEndTime: string;
    public eventLocation: string;
    public eventPrice: number;
    public eventType: string;
    public totalTickets: number;
    public totalReceivedAmount: number;
    public payToPlatform: number;
    // public organizer?: any;
    public isSuspended?:boolean=false;
    public attendeeId?:number;
    public organizerId?:number;
}