export const convertNumberToVND = (amount: number, includeUnit: boolean = true): string => {
  if (isNaN(amount)) {
    return `0${includeUnit ? "đ" : ""}`;
  }

  // Làm tròn lên số tiền
  const roundedAmount = Math.ceil(amount);

  // Định dạng số tiền thành chuỗi có dấu chấm phân cách
  const formattedAmount = roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Thêm đơn vị "đ"
  return `${formattedAmount}${includeUnit ? "đ" : ""}`;
};
