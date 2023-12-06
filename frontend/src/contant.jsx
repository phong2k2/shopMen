export const orderStatus = {
    'processing': {
        color: 'warning',
        title: 'Chờ xử lý',
        next: 'confirmed'
    },
    'confirmed': {
        color: 'secondary',
        title: 'Đã xác nhận',
        next: 'shipped'
    },
    'shipped': {
        color: 'info',
        title: 'Đanh giao hàng',
        next: 'complete'
    },
    'complete': {
        color: 'success',
        title: 'Hoành thành',
    },
    'cancelled': {
        color: 'error',
        title: 'Hủy'
    },
} 