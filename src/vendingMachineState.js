class VendingMachineState {
  constructor() {
    this.userMoney = 0; // 투입 금액
    this.isCardInserted = false; // 카드 삽입 여부
    this.isReadyForSelection = false; // 음료 선택 가능 여부
    this.isChangeRequired = false; // 잔돈 반환 가능 여부
  }

  reset() {
    this.userMoney = 0;
    this.isCardInserted = false;
    this.isReadyForSelection = false;
    this.isChangeRequired = false;
  }

  // 음료 선택이 가능한지
  updateReadyForSelection(inventory) {
    this.isReadyForSelection = inventory.some((item) => this.isCardInserted || this.userMoney >= item.price);
  }
}

module.exports = VendingMachineState;
