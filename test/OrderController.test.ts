import axios from "axios";
test("Deve testar o preview pela API", async function () {
    const input = {
        cpf: "111.444.777-35",
        orderItems:[
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 1 }
        ]
    };
    const response = await axios.post("http://localhost:3000/preview", input);
    const preview = response.data;
    expect(preview.total).toBe(6150);
});