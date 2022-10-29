import { CheckIcon } from "@radix-ui/react-icons";

interface Props {
    value: string,
    children: string,
}

function DropBoxMultiSelectItem({value, children}: Props) {
    return (
        <option value={value}>{children}</option>
    )
}

export default DropBoxMultiSelectItem;