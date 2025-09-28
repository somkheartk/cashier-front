import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export default function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories
}: ProductFiltersProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="ค้นหาสินค้า (ชื่อ, บาร์โค้ด)..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              className="thai-body"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>หมวดหมู่</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                label="หมวดหมู่"
              >
                <MenuItem value="all">ทั้งหมด</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
