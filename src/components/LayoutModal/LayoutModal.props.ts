export interface LayoutModalProps {
    children: JSX.Element;
    closeModal: () => void;
    active?: boolean;
    className?: string;
}
