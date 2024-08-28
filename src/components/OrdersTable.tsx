export default function OrdersTable(props: { orders: any[] }) {
  return (
    <table className="w-full bordered-table">
      <thead>
        <tr className="font-semibold">
          {/* <th>Order ID</th> */}
          {/* <td>User ID</td> */}
          <td>Contact</td>
          <td>Items</td>
          <td>Address</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        {props.orders.map((order) => {
          const address = JSON.parse(order.deliveryAddress);
          console.log(address);
          return (
            <tr key={order.orderId} className="border-b border-dashed">
              {/* <td>{order.orderId}</td> */}
              <td>
                <p>
                  {order.user.name}
                  <br />
                  +91 {order.user.phone.substring(0, 5) || "N/A"}{" "}
                  {order.user.phone.substring(5, 10) || "N/A"}
                  <p>{order.user.email || "N/A"}</p>
                </p>
              </td>
              <td>
                {order.items.map((item: any, index: any) => (
                  <p key={index}>
                    <span className="text-xl">
                      {item.productId.split("-").join(" ")}
                    </span>{" "}
                    <br />
                    {item.variant == 0 ? "200ml" : item.variant}{" "}
                    <span className="text-sm opacity-60">
                      ({item.quantity} Nos)
                    </span>
                    <br />₹{item.price}
                    <br />
                  </p>
                ))}
              </td>
              <td>
                <p className="text-sm">
                  {address.floor}, {address.houseNumber}
                  <br />
                  {address.apartment}
                  <br />
                  {address.landmark}
                  <br />
                  <span className="whitespace-pre-line">
                    {address.address} -{" "}
                    {address.pincode.toString().substring(4, 6)}
                  </span>
                </p>
              </td>
              <td>{order.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
