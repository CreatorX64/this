let restaurant =
{
  name: "ASB",
  guestCapacity: 75,
  guestCount: 0,
  checkAvailablity: function (partySize)
  {
    let seatsLeft = this.guestCapacity - this.guestCount;
    return partySize <= seatsLeft;
  },
  // Challenge
  seatParty: function (partySize)
  {
    this.guestCount = this.guestCount + partySize;
  },
  removeParty: function (partySize)
  {
    this.guestCount = this.guestCount - partySize;
  }
};

restaurant.seatParty(72);
console.log(restaurant.checkAvailablity(4));
restaurant.removeParty(5);
console.log(restaurant.checkAvailablity(4));