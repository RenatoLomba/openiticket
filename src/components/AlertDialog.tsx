import { FC, useRef } from 'react';
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import { Button } from './Button';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  body?: string;
  handleCancel?: () => Promise<void>;
  handleConfirm?: () => Promise<void>;
}

export const AlertDialog: FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  handleCancel,
  handleConfirm,
  header,
  body,
}) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {header && (
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>
          )}

          {body && <AlertDialogBody>{body}</AlertDialogBody>}

          <AlertDialogFooter>
            <Button
              bg="red.default"
              ref={cancelRef}
              onClick={async () => {
                await handleCancel?.();
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={async () => {
                await handleConfirm?.();
                onClose();
              }}
              ml={3}
            >
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  );
};
