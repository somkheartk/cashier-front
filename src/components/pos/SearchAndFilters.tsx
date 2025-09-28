import React from 'react';
import {
  Box,
  TextField,
  Chip,
  Typography,
  IconButton
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'name' | 'price' | 'stock';
  onSortChange: (sort: 'name' | 'price' | 'stock') => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  searchInputRef,
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        placeholder="🔍 ค้นหาสินค้า... (Ctrl+F)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        inputRef={searchInputRef}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          endAdornment: searchTerm && (
            <IconButton size="small" onClick={() => onSearchChange('')}>
              <Clear sx={{ fontSize: 18 }} />
            </IconButton>
          )
        }}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            background: 'rgba(255,255,255,0.8)',
            '&:hover': {
              background: 'rgba(255,255,255,0.9)'
            },
            '&.Mui-focused': {
              background: 'white',
              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
            }
          }
        }}
      />

      {/* Enhanced Category Filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => onCategoryChange(category)}
            variant={selectedCategory === category ? 'filled' : 'outlined'}
            color={selectedCategory === category ? 'primary' : 'default'}
            sx={{
              borderRadius: 2,
              fontWeight: 'medium',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              },
              transition: 'all 0.2s ease'
            }}
          />
        ))}
      </Box>

      {/* Sort Options */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          เรียงตาม:
        </Typography>
        {[
          { value: 'name', label: 'ชื่อ' },
          { value: 'price', label: 'ราคา' },
          { value: 'stock', label: 'สต็อก' }
        ].map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            size="small"
            onClick={() => onSortChange(option.value as 'name' | 'price' | 'stock')}
            variant={sortBy === option.value ? 'filled' : 'outlined'}
            color={sortBy === option.value ? 'secondary' : 'default'}
          />
        ))}
      </Box>
    </Box>
  );
};
