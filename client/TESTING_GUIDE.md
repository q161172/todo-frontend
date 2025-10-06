# Hướng dẫn kiểm thử nhanh

## 🧪 Test Cases

### 1. **Login Flow**
```
1. Mở app (chưa login)
   ✅ Không gọi API
   ✅ Todos = []
   ✅ Loading = false

2. Login thành công
   ✅ Tự động gọi API với default filters
   ✅ Hiển thị tất cả todos của user
   ✅ Filters reset về default

3. Logout
   ✅ Clear todos
   ✅ Clear errors
   ✅ Không gọi API nữa
```

### 2. **Filter Changes**
```
1. Thay đổi status filter
   ✅ Gọi API với filter mới
   ✅ Hiển thị loading
   ✅ Update todos list

2. Thay đổi search
   ✅ Gọi API với search term
   ✅ Debounce (nếu cần)

3. Thay đổi sort
   ✅ Gọi API với sort mới
   ✅ Todos được sắp xếp đúng
```

### 3. **API Calls**
```
1. Check Network Tab
   ✅ GET /api/todos (default)
   ✅ GET /api/todos?status=active
   ✅ GET /api/todos?priorities=high&priorities=medium
   ✅ GET /api/todos?search=meeting&sort=dueAsc

2. Xác minh qua Network Tab thay vì console logs
```

## 🔍 Debug Commands

### Lưu ý
- Ưu tiên kiểm thử qua Network và UI thay vì console

### Network Tab
```
1. Filter by Status: ?status=active
2. Multiple Priorities: ?priorities=high&priorities=medium
3. Search: ?search=keyword
4. Sort: ?sort=dueAsc
5. Overdue: ?overdueOnly=true
6. Combined: ?status=active&priorities=high&search=meeting&sort=dueAsc
```

## 🐛 Common Issues

### Issue 1: Không load todos khi login
**Cause**: Token chưa được set hoặc API endpoint sai
**Fix**: Kiểm tra Local Storage và cấu hình API base URL

### Issue 2: Infinite API calls
**Cause**: useEffect dependency loop
**Fix**: Check useCallback dependencies

### Issue 3: Filters không update
**Cause**: Context không update
**Fix**: Check AppProvider value

## ✅ Expected Behavior

### Login Success
```
1. User login → currentUser set
2. useFilters detect currentUser change
3. Reset filters to default
4. Call API with default filters
5. Display all user todos
```

### Filter Change
```
1. User change filter → setFilters called
2. useFilters detect filter change
3. Call API with new filters
4. Update todos list
5. Display filtered results
```

### Logout
```
1. User logout → currentUser = null
2. useFilters detect currentUser = null
3. Clear todos array
4. Clear errors
5. Stop API calls
```

