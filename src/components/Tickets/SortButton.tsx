import { FC } from 'react';
import {
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { FaSortAmountUp } from 'react-icons/fa';
import { Sorter, sorters } from '../../helpers/constants/sorters';

interface SortButtonProps {
  sortBy: Sorter;
  changeSortBy: (sorter: Sorter) => void;
}

export const SortButton: FC<SortButtonProps> = ({ sortBy, changeSortBy }) => {
  return (
    <Menu isLazy>
      <MenuButton>
        <HStack>
          <Icon as={FaSortAmountUp} color="grayscale.grayLight" w="4" h="4" />
          <Text fontWeight="semibold" fontSize="sm" isTruncated>
            {sortBy.text}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList>
        {sorters.map((sorter) => {
          if (sorter == sortBy) return null;

          return (
            <MenuItem key={sorter.value} onClick={() => changeSortBy(sorter)}>
              {sorter.text}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
