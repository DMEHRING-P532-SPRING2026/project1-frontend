import config from '../config'

export async function placeOrder(userId, orderType, ticker, quantity, side, condition, limitPrice) {
    let conditionType = null;
    switch (condition) {
        case "Less Than":
            conditionType = "LESS_THAN"
            break;
        case "Less Than or Equal to":
            conditionType = "LESS_THAN_OR_EQUAL"
            break;
        case "Greater Than":
            conditionType = "GREATER_THAN"
            break;
        case "Greater Than or Equal to":
            conditionType = "GREATER_THAN_OR_EQUAL"
            break;

    }
    const orderFormated = {
        userID: userId,
        orderType: orderType.toUpperCase(),
        ticker,
        quantity: parseInt(quantity),
        side: side.toUpperCase(),
        limitPrice: orderType === "Limit" ? parseFloat(limitPrice) : null,
        conditionType
    }
    const response = await fetch(`${config.BASE_URL}/api/trades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderFormated)
    })
}