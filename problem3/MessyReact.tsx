import { PropsWithChildren, useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  // missing type for blockchain
  blockchain: string;
}

// FormattedWalletBalance can be simplified to extend WalletBalance, but anyway, it is unused in the code
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Redundant interface declaration
// interface Props extends BoxProps {}

// simplify type declaration
const WalletPage: React.FC<PropsWithChildren> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // should be check if lhsPriority, not balancePriority 
        const lhsPriority = getPriority(balance.blockchain);

        // simplified check to avoid nested ifs
        if (lhsPriority > -99 && balance.amount > 0) {
          return true;
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        // simplified comparison
        return rightPriority - leftPriority;
      });
    // redundant dependencies, removed prices
  }, [balances]);

  // this original code is not needed
  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed(),
  //   };
  // });

  // should be formattedBalances.map(...)
  const rows = sortedBalances.map(
    (balance: WalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          // improved version
          formattedAmount={balance.amount.toFixed()}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
