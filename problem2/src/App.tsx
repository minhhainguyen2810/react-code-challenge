import { Button, Form, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import "./App.css";

type FormInstance = {
  amountToSend: number;
  currencyToSend: string;
  amountToReceive: number;
  currencyToReceive: string;
};

type Currency = {
  currency: string;
  price: number;
  date: string;
};

function App() {
  const [form] = Form.useForm<FormInstance>();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((data: Currency[]) => {
        setCurrencies(
          data.filter((item, index, self) => {
            return (
              index === self.findIndex((t) => t.currency === item.currency)
            );
          })
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const onFinish = (values: FormInstance) => {
    // Calculate amount to receive based on selected currencies and amount to send
    const priceSend =
      currencies.find((item) => item.currency === values.currencyToSend)
        ?.price ?? 0;
    const priceReceive =
      currencies.find((item) => item.currency === values.currencyToReceive)
        ?.price ?? 0;
    let amountToReceive = 0;
    console.log("priceSend:", priceSend);
    console.log("priceReceive:", priceReceive);
    if (priceSend > 0 && priceReceive > 0) {
      amountToReceive = (values.amountToSend * priceSend) / priceReceive;
    }
    form.setFieldsValue({
      amountToReceive: Number(amountToReceive.toFixed(3)),
    });
  };

  return (
    <div className="text-gray-600 flex flex-col items-center justify-center bg-white h-[100vh] w-[100vw]">
      <div className="flex flex-col w-[512px] items-center justify-center">
        <h2 className="mb-4 text-black text-2xl">Currency Exchange</h2>
        <Form
          className="w-full"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            amountToSend: undefined,
            currencyToSend: undefined,
            amountToReceive: undefined,
            currencyToReceive: undefined,
          }}
        >
          <div className="flex gap-6">
            <div className="flex flex-col flex-1">
              <Form.Item
                name="amountToSend"
                label="Amount to Send"
                rules={[
                  { required: true, message: "Please enter amount to send" },
                  {
                    validator: (_, value) =>
                      value > 0
                        ? Promise.resolve()
                        : Promise.reject("Amount must be greater than 0"),
                  },
                  {
                    type: "number",
                    transform: (value) => Number(value),
                    message: "Amount must be a number",
                  },
                ]}
              >
                <InputNumber className="w-full" min={0} />
              </Form.Item>
              <Form.Item
                name="currencyToSend"
                label="Currency to Send"
                rules={[
                  { required: true, message: "Please select a currency" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select currency"
                  loading={loading}
                  filterOption={(input, option) =>
                    (option?.currency ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  onSearch={() => {}}
                  options={currencies.map((item) => ({
                    currency: item.currency,
                    label: (
                      <div className="flex items-center gap-2">
                        <span>
                          <img
                            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`}
                          />
                        </span>
                        <span>{item.currency}</span>
                      </div>
                    ),
                    value: item.currency,
                  }))}
                />
              </Form.Item>
            </div>
            <div className="flex flex-col flex-1">
              <Form.Item name="amountToReceive" label="Amount to Receive">
                <InputNumber disabled />
              </Form.Item>
              <Form.Item
                name="currencyToReceive"
                label="Currency to Receive"
                rules={[
                  { required: true, message: "Please select a currency" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select currency"
                  loading={loading}
                  filterOption={(input, option) =>
                    (option?.currency ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  onSearch={() => {}}
                  options={currencies.map((item) => ({
                    currency: item.currency,
                    label: (
                      <div className="flex items-center gap-2">
                        <span>
                          <img
                            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`}
                          />
                        </span>
                        <span>{item.currency}</span>
                      </div>
                    ),
                    value: item.currency,
                  }))}
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default App;
