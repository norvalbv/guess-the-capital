# Guess The Capital

## Description

Guess The Capital Quiz is a web application that tests your knowledge about world capitals. It allows users to guess the capital of a randomly selected country and provides instant feedback using an intutative interface.

## Installation and Running

### Steps

1. Clone the repository
    ```bash
    git clone https://github.com/norvalbv/guess-the-capital
    ```

**Start the webapp**

2. Navigate into the project's directory webapp
    ```bash
    cd guess-the-capital/webapp
    ```
3. Install the dependencies
    ```bash
    yarn install
    ```
4. Run the application
    ```bash
    yarn start
    ```
Open `http://localhost:7777` in your browser. (You can change the port in `vite.config.ts`)

**Start the backend**

5. Navigate into the project's directory backend
    ```bash
    cd guess-the-capital/backend
    ```
6. Install the dependencies
    ```bash
    yarn install
    ```
7. Run the application
    ```bash
    yarn start
    ```

The backend will run on port 3000.

## Built With

- React
- TypeScript
- TailwindCSS
- Jest
- SWR
- Axios
- Yarn
- Visx (a D3 wrapper)
- Serverless

and more!

## Testing

To test the webapp, run:
```Bash
yarn test
```

Or, if not in the webapp folder, run:
```Bash
cd webapp && yarn test
```


**Enjoy quizzing!**