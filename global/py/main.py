import datetime
import requests
import time

authToken = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXdnbmlpMjEiLCJzdHJpcGUiOiJjdXNfS1A2N3BLTDVLM1c1Q2UiLCJwbGFuIjoiU3RhcnRlciIsImdhbWVzUGxheWVkIjowLCJlbWFpbCI6ImZpYW5AbmllYS5jb20iLCJkYXRlQ3JlYXRlZCI6IjIwMjEtMTAtMTRUMDA6MzY6MTQuODQ2WiIsInJvbGUiOiJUZWFjaGVyIiwiaGFzUGFzc3dvcmQiOnRydWUsImlhdCI6MTYzNDE3MTc3NiwiZXhwIjoxNjM0Nzc2NTc2fQ.GRd9PxbwYX1UG6sleXDoV4YgA67Lq5jIOh7ld7KlFn4" # add your blooket token in string


def getName(token):
    r = requests.get('https://api.blooket.com/api/users/verify-token',
                     params={"token": f"{token}"})

    return r.json()["name"]

blooketName = getName(authToken)

def getLastTokenDate():
    r = requests.get(f"https://api.blooket.com/api/users?name={blooketName}")
    last_token_date = datetime.datetime.strptime(
        r.json()["lastTokenDay"], "%Y-%m-%dT%H:%M:%S.%fZ")
    date_now = datetime.datetime.strptime(
        datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"), "%Y-%m-%dT%H:%M:%SZ")
    account_created_date = r.json()["dateCreated"]

    return (last_token_date, date_now, account_created_date)

def getCreatedDate():
    r = requests.get(f"https://api.blooket.com/api/users?name={blooketName}")
    return datetime.datetime.strptime(r.json()["dateCreated"], "%Y-%m-%dT%H:%M:%SZ")
    

def addTokens():
    getData = getLastTokenDate()
    blooketName = getName(authToken)

    request_url = "https://api.blooket.com/api/users/add-rewards"
    request_data = {
        "name": blooketName,
        "addedTokens": 500,
        "addedXp": 300
    }

    if getData[0].day == getData[1].day + 1:
        try:
            r = requests.put(request_url, request_data, headers={
                             "authorization": authToken})
            print(f"Rewarded {blooketName} 500 tokens")
        except Exception as e:
            print(e)
    elif getData[0].day != getData[1].day + 1:
        print(f"{blooketName} has already earned max tokens in the past 24 hours!")
    elif (getCreatedDate().year, getCreatedDate().month, getCreatedDate().day)  == (getData[1].year, getData[1].month, getData[1].day):
        try:
            r = requests.put(request_url, request_data, headers={"authorization": authToken})
            print(f"Rewarded {blooketName} 500 tokens")
        except Exception as e:
            print(e)



while True:
    addTokens()
    time.sleep(86400000)