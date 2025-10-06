# Lọc trên server (tổng quan sản phẩm)

## 🎯 Tổng quan

Hệ thống lọc được xử lý trên server để tối ưu hiệu suất và mang lại trải nghiệm mượt mà.

## 🔄 Cách hoạt động

### Backend
- Lọc và sắp xếp thực hiện trực tiếp trên database qua Prisma
- Endpoint: `GET /api/todos?status=active&priorities=high&priorities=medium&search=keyword&sort=createdDesc`

### Frontend
- `todoService` xây query từ filters và gọi API
- `useFilters` tự động gọi lại khi filters thay đổi

## 📋 Supported Filters

| Filter | Values | Description |
|--------|--------|-------------|
| `status` | `all`, `active`, `completed` | Trạng thái todo |
| `priorities` | `high`, `medium`, `low` | Mức độ ưu tiên (có thể chọn nhiều) |
| `overdueOnly` | `true`, `false` | Chỉ hiện todo quá hạn |
| `search` | string | Tìm kiếm trong title và description |
| `sort` | `createdDesc`, `createdAsc`, `dueAsc`, `dueDesc`, `priorityDesc`, `priorityAsc`, `titleAsc` | Sắp xếp |

## 🚀 Cách sử dụng

### 1. Trong Components
```typescript
import { useApp } from "@/contexts/AppContext";

function MyComponent() {
  const { 
    todos,           // Danh sách todos từ server
    loading,         // Trạng thái loading
    filters,         // Current filters
    setFilters,      // Update filters
    setSearch,       // Update search
    setSort,         // Update sort
    refresh          // Manual refresh
  } = useApp();

  // Update filter
  const handleStatusChange = (status) => {
    setFilters({ ...filters, status });
  };
}
```

### 2. Direct API Calls
```javascript
import { getTodos } from "@/services/todoService";

// Get todos với filters
const todos = await getTodos({
  status: "active",
  priorities: ["high", "medium"],
  search: "important",
  sort: "dueAsc"
});
```

## 🔧 API Examples

### Get all todos
```
GET /api/todos
```

### Filter by status
```
GET /api/todos?status=active
```

### Multiple priorities
```
GET /api/todos?priorities=high&priorities=medium
```

### Search with sort
```
GET /api/todos?search=meeting&sort=dueAsc
```

### Overdue todos only
```
GET /api/todos?overdueOnly=true
```

## ⚡ Performance Benefits

1. **Reduced Bandwidth**: Chỉ gửi data cần thiết
2. **Faster Queries**: Database indexing tối ưu
3. **Better UX**: Loading states và error handling
4. **Scalability**: Xử lý được lượng data lớn

## Kiểm tra nhanh

- Dùng DevTools Network để xem query params và response

## 🔄 Migration Notes

### Thay đổi chính:
1. **useFilters hook**: Không cần truyền `todos` vào nữa
2. **Auto-refresh**: Tự động gọi API khi filters thay đổi
3. **Loading states**: Hiển thị loading khi fetch data
4. **Error handling**: Xử lý lỗi API calls

### Tương thích:
- Tất cả components hiện tại vẫn hoạt động
- API interface không thay đổi
- Context structure được giữ nguyên
