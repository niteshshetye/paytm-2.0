import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms";

export const useBalance = () => {
  const value = useRecoilValue(balanceAtom);
  return value;
};
