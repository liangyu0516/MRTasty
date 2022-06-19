from timeit import repeat
import schedule
from schedule import every, repeat, run_pending

@repeat(every().minute, "test")
def hello(text):
    print(text)
while True:
    run_pending()