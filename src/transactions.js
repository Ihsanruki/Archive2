class Transaction {
    constructor(id, itemName, quantity, price, barangId, status) {
      this.id = id;
      this.itemName = itemName;
      this.quantity = quantity;
      this.price = price;
      this.barangId = barangId;
      this.status = status;
    }
  }
  
  const transactions = [
    new Transaction(1, 'dw', 1, 900, 1, 'pending'),
    new Transaction(2, 'dw', 1, 900, 1, 'pending'),
  ];
  
  export default transactions;
  