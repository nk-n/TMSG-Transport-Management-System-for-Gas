export interface Trip {
  trip_id: string;
  money: number;
}

export interface SpecialTrip {
  special_trip_id: string;
  reason: string;
  money: number;
}

export interface SpecialTripResponse {
  special_trip_id: string;
  reason: string;
  money: number;
}

export const toSpecialTrip = (data: SpecialTripResponse) => {
  return {
    special_trip_id: data.special_trip_id,
    reason: data.reason,
    money: data.money,
  };
};
