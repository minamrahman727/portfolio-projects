# Interactive Currency Converter

def currency_converter():
    rates = {
        'USD': {'PKR': 278, 'EUR': 0.91, 'GBP': 0.76, 'INR': 82, 'AED': 3.67},
        'PKR': {'USD': 0.0036, 'EUR': 0.0032, 'GBP': 0.0027, 'INR': 0.3016, 'AED': 0.1},
        'EUR': {'USD': 1.08, 'PKR': 335, 'GBP': 0.84 , 'INR': 99, 'AED': 3.67},
        'GBP': {'USD': 1.28, 'PKR': 396, 'EUR': 1.19, 'INR': 123, 'AED': 3.67},
        'inr': {'USD': 0.013, 'PKR': 3.33, 'EUR': 0.12, 'GBP': 0.11, 'AED': 0.27},
        'AED': {'USD': 0.27, 'PKR':75.80 , 'EUR': 0.25, 'GBP': 0.21, 'INR': 0.54},
    }

    print("Available currencies: USD, PKR, EUR, GBP")
    
    from_currency = input("Enter the currency you want to convert from (e.g., USD): ").upper()
    to_currency = input("Enter the currency you want to convert to (e.g., PKR): ").upper()
    amount = float(input(f"Enter amount in {from_currency}: "))

    if from_currency in rates and to_currency in rates[from_currency]:
        converted_amount = amount * rates[from_currency][to_currency]
        print(f"{amount} {from_currency} is equal to {converted_amount:.2f} {to_currency}")
    else:
        print(f"Sorry, conversion from {from_currency} to {to_currency} is not available.")

if __name__ == "__main__":
    currency_converter()
