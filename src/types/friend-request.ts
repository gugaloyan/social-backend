export interface FriendPendingResponse {
    id: number;
    requester_id: number;
    first_name: string;
    last_name: string;
    age: number;
    email: string;
    status: string;
  }
  
  export interface FriendRequest {
    id: number;
    requester_id: number;
    receiver_id: number;
    status: string;
    created_at: string;
  }
  