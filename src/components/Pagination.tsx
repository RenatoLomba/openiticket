import { FC } from 'react';
import {
  Button,
  Flex,
  FlexProps,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps extends FlexProps {
  toItem?: number;
  fromItem?: number;
  totalCount?: number;
  currentPage: number;
  itemsPerPage: number;
  itemsPerPageList: number[];
  onItemsPerPageSelected?: (items: number) => void;
  onNextPage?: (nextPage: number) => void;
  onPreviousPage?: (previousPage: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  itemsPerPageList,
  onItemsPerPageSelected,
  onNextPage,
  onPreviousPage,
  fromItem,
  toItem,
  totalCount,
  ...props
}) => {
  return (
    <Flex {...props} align="center">
      <Menu isLazy>
        <Flex align="center">
          <Text color="grayscale.gray" fontSize="md" mr="2">
            Itens por página:{' '}
          </Text>

          <MenuButton as={Button} rightIcon={<Icon as={FaChevronDown} w="2" />}>
            {itemsPerPage}
          </MenuButton>
        </Flex>

        <MenuList>
          {itemsPerPageList.map((items) => (
            <MenuItem
              key={items}
              onClick={() => onItemsPerPageSelected?.(items)}
            >
              {items}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Text ml="10" color="grayscale.gray" fontSize="md" mr="2">
        {fromItem} - {toItem} de {totalCount}
      </Text>

      <Flex ml="6" gap="2">
        <Button
          disabled={currentPage === 1}
          bg="transparent"
          _hover={{ bg: 'gray.100' }}
          _active={{ bg: 'gray.200' }}
          onClick={() => onPreviousPage?.(currentPage - 1)}
        >
          <Icon as={FaChevronLeft} />
        </Button>
        <Button
          disabled={toItem === totalCount}
          bg="transparent"
          _hover={{ bg: 'gray.100' }}
          _active={{ bg: 'gray.200' }}
          onClick={() => onNextPage?.(currentPage + 1)}
        >
          <Icon as={FaChevronRight} />
        </Button>
      </Flex>
    </Flex>
  );
};
