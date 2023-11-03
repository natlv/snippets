// Check if value inside (Works for list/pair/combination)
function has(tree, value) {
    if (is_null(tree)) {
        return tree;
    } else {
        return is_number(tree)
            ? tree === value
            : has(head(tree), value) || has(tail(tree), value);
    }
}

// Make copy of an array
function copy(A) {
    const l = array_length(A);
    let b = [];
    for (let i = 0; i < l; i = i + 1) {
        b[i] = A[i];
    }
    return b;
}
//const my_array = [3,41,20,1,5,16,4,0,14,6,17,8,4,0,2];

// Convert an array to a list
function arr_to_list(a, n) {
    if (n === array_length(a)) {
        return null;
    } else {
        return pair(a[n], arr_to_list(a, n + 1));
    }
}

// Convert a list to an array
function list_to_arr(list) {
    let M = [];
    for (let i = 0; i < length(list); i = i + 1) {
        M[i] = list_ref(list, i);
    }
    return M;
}

// Make matrix of all zeroes
function make_matrix(x,y) {
    let a = [];
    for (let i = 0; i < x; i = i + 1) { 
        a[i] = [];
        for (let j = 0; j < y; j = j + 1) {
            a[i][j] = 0; 
        }
    }
    return a;
}

// Make matrix of 1 2 3 4...
function matrix(r, c){
    let M = [];
    let int = 1;
    for (let i = 0; i < r; i = i + 1) {
        M[i] = [];
        for (let j = 0; j < c; j = j + 1) {
            M[i][j] = int;
            int = int + 1;
        }
    }
    return M;
}

// Transpose matrix
function transpose(matrix) {
    let M = [];
    for (let i = 0; i < array_length(matrix[0]); i = i + 1) {
        M[i] = [];
        for (let j = 0; j < array_length(matrix); j = j + 1) {
            M[i][j] = matrix[j][i];
        }
    }
    return M;
}

// Reverse the rows of a matrix
function reverse(matrix) {
    const len = array_length(matrix[0]);
    for (let i = 0; i < array_length(matrix); i = i + 1) {
        for (let j = 0; j < math_floor(len / 2); j = j + 1) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[i][len - 1 - j];
            matrix[i][len - 1 - j] = temp;
        }
    }
    return matrix;
}

// Sorting & search [arrays] 
// linear search
function linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i < len && A[i] !== v) {
        i = i + 1;
    }
    return (i < len);
}


// binary search (recursive)
function binary_search_A(A, v) {

    function search(low, high) {
        if (low > high) {
            return false;
        } else {
            const mid = math_floor((low + high) / 2);
            return (v === A[mid]) ||
                   (v < A[mid] 
                    ? search(low, mid - 1)
                    : search(mid + 1, high));
        }
    }
    return search(0, array_length(A) - 1);
}

// binary_search (loop)
function binary_search_A2(A, v) {
    let low = 0;
    let high = array_length(A) - 1;

    while (low <= high) {
        const mid = math_floor((low + high) / 2 );
        if (v === A[mid]) {
            break;
        } else if (v < A[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return (low <= high);
}


// selection sort 
function selection_sort_A(A) {
    const len = array_length(A);

    for (let i = 0; i < len - 1; i = i + 1) {
        let min_pos = find_min_pos(A, i, len - 1);
        swap(A, i, min_pos);
    }
}

function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; j = j + 1) {
        if (A[j] < A[min_pos]) {
            min_pos = j;
        }
    }
    return min_pos;
}

function swap(A, x, y) {
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}


// insertion sort
function insertion_sort_A(A) {
    const len = array_length(A);
    
    for (let i = 1; i < len; i = i + 1) {
        let j = i - 1;
        while (j >= 0 && A[j] > A[j + 1]) {
            swap(A, j, j + 1);
            j = j - 1;
        }
    }
}

function insertion_sort2(A) {
    const len = array_length(A);
    
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j]; // shift right
            j = j - 1;
        }
        A[j + 1] = x;
    }
}


// merge sort 
function merge_sort(A) {
    merge_sort_helper(A, 0, array_length(A) - 1);
}

function merge_sort_helper(A, low, high) {
    if (low < high) {
        const mid = math_floor((low + high) / 2);
        merge_sort_helper(A, low, mid);
        merge_sort_helper(A, mid + 1, high);
        merge_A(A, low, mid, high);
    }
}

function merge_A(A, low, mid, high) {
    const B = [];
    let left = low;
    let right = mid + 1;
    let Bidx = 0;
    
    while (left <= mid && right <= high) {
        if (A[left] <= A[right]) {
            B[Bidx] = A[left];
            left = left + 1;
        } else {
            B[Bidx] = A[right];
            right = right + 1;
        }
        Bidx = Bidx + 1;
    }
    
    while (left <= mid) {
        B[Bidx] = A[left];
        Bidx = Bidx + 1;
        left = left + 1;
    }   
    while (right <= high) {
        B[Bidx] = A[right];
        Bidx = Bidx + 1;
        right = right + 1;
    }
    
    for (let k = 0; k < high - low + 1; k = k + 1) {
        A[low + k] = B[k];
    }
}


// Array useful functions/ abstractions
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
}


// Filter to modify original list (destructive)
function d_filter(pred, xs) {
    if(is_null(xs)) {
        return xs;
    } else if (pred(head(xs))) {
        set_tail(xs, d_filter(pred, tail(xs)));
        return xs;
    } else {
        return d_filter(pred, tail(xs));
    }
}

// Curry a function (single argument)
/*
function curry(f) {
    return x => y => f(x, y);
} 
curry(math_pow)(3)(4);
*/

// Stream pairs
function stream_pairs(s) { 
    return is_null(s)
    ? null
    : stream_append(
    stream_map(
        sn => pair(head(s), sn),
        stream_tail(s)),
    stream_pairs(stream_tail(s)));
}

const ints = stream(1,2,3,4,5);
stream_pairs(ints);

// Sorting for list, small to big
function insert(x, xs) {
    return is_null(xs)
        ? list(x)
        : x <= head(xs)
            ? pair(x, xs)
            : pair(head(xs), insert(x, tail(xs)));
}
function insertion_sort(xs) {
    return is_null(xs)
        ? xs
        : insert(head(xs), insertion_sort(tail(xs)));
}

function selection_sort(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
    }
}
function smallest(xs) {
    function h(xs, min) {
        return xs === null 
            ? min
            : head(xs) < min
                ? h(tail(xs), head(xs))
                : h(tail(xs), min);
    }
    return h(xs, head(xs));
}

function quicksort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const pivot = head(xs);
        const splits = partition(tail(xs), pivot);
        const smaller = quicksort(head(splits));
        const bigger = quicksort(tail(splits));
        return append(smaller, pair(pivot, bigger));
    }
}
function partition(xs, p) {
    function h(xs, lte, gt) {
        if (is_null(xs)) {
            return pair(lte, gt);
        } else {
            const first = head(xs);
            return first <= p
                ? h(tail(xs), pair(first, lte), gt)
                : h(tail(xs), lte, pair(first, gt));
        }
    }
    return h(xs, null, null);
}

function take(xs, n) {
    return n === 0
        ? null 
        : pair(head(xs), take(tail(xs), n -1));
}
function drop(xs, n) {
    return n === 0 
        ? xs
        : drop(tail(xs), n - 1);
}
function merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        return (x < y) 
            ? pair(x, merge(tail(xs), ys))
            : pair(y, merge(xs, tail(ys)));
    }
}
function merge_sort(ys) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const mid = math_floor(length(xs) / 2);
        return merge(merge_sort(take(xs, mid)),
                     merge_sort(drop(xs, mid)));
    }
}

// Insertion sort for any case 
function insert_cmp(x, xs, cmp) {
    return is_null(xs)
        ? list(x)
        : cmp(x, head(xs))
            ? pair(x, xs)
            : pair(head(xs),
                insert_cmp(x, tail(xs), cmp));
}
function insertion_sort_cmp(xs, cmp) {
    return is_null(xs)
        ? xs
        : insert_cmp(head(xs),
                insertion_sort_cmp(tail(xs), cmp),
                cmp);
}
// Ascending order ie smallest to biggest
insertion_sort_cmp(list(3,6,2,4,8,9), (x, y) => (x < y));
// Descending order
insertion_sort_cmp(list(3,6,2,4,8,9), (x, y) => (x > y));
// Reverse list
insertion_sort_cmp(list(3,6,2,4,8,9), (x, y) => false);


// Workings of standard functions on list
/*
function map(fun, xs) {
    return is_null(xs)
        ? null 
        : pair(fun(head(xs)),
                map(fun, tail(xs)));
}
function accumulate(f, initial, xs) {
    return is_null(xs)
        ? initial
        : f(head(xs), accumulate(f, initial, tail(xs)));
}
function filter(pred, xs) {
    return is_null(xs)
        ? xs
        : pred(head(xs))
            ? pair(head(xs), filter(pred(tail(xs))))
            : filter(pred, tail(xs));
}
function remove_duplicates_filter(lst) {
    return is_null(lst)
        ? is_null
        : pair(head(lst),
            filter(x => !equal(x, head(lst)), remove_duplicates_filter(tail(lst))));
}
function remove_duplicates_accum(lst) {
    return accumulate((x,xs) => is_null(member(x,xs))
                                    ? pair(x, xs)
                                    : xs,
                        null,
                        lst);
}
function subsets(xs) {
    return accumulate((x, ss) => append(ss, map(s => pair(x, s), ss)),
                     list(null),
                     xs);
}
function permutations(s) {
    return is_null(s)
        ? list(null)
        : accumulate(append,
                     null,
                     map(x => map(p => pair(x, p), permutations(remove(x, s))),
                         s));
}
*/

// Binary search trees
/*
function insert(bst, item) {
    if (is_empty_tree(bst)) {
        return make_tree(item, make_empty_tree(),
            make_empty_tree());
    } else {
        if (item < entry(bst)) {
            // smaller than entry i.e. left branch
            return make_tree(entry(bst),
                        insert(left_branch(bst),
                            item),
                        right_branch(bst));
        } else if (item > entry(bst)) {
            // bigger than entry i.e. right branch
            return make_tree(entry(bst),
                        left_branch(bst),
                        insert(right_branch(bst),
                        item));
        } else {    
        // equal to entry; note BST should not contain duplicates
        return bst;
        }
    }
}
function find(bst, name) {
    return is_empty_tree(bst)
        ? false
        : name === entry(bst)
            ? true
            : name < entry(bst)
                ? find(left_branch(bst), name)
                : find(right_branch(bst), name);
}
function bst_min(bst) {
    return is_null(head(tail(bst)))
        ? head(bst)
        : bst_min(head(tail(bst)));
}
*/

// Memoisation
/*
function memoize(f) {
    const mem = [];
    
    function mf(x) {
        if (mem[x] !== undefined) {
            return mem[x];
        } else {
            const result = f(x);
            mem[x] = result;
            return result;
        }
    }
    
    return mf;
}
*/

// Memoized n choose k (combinations formula)
/*
const mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function mchoose(n, k) {
    if (read(n, k) !== undefined) {
        return read(n, k);
    } else {
        const result = k > n
                       ? 0
                       : k === 0 || k === n
                       ? 1
                       : mchoose(n - 1, k) + mchoose(n - 1, k - 1);
        write(n, k, result);
        return result;
    }
}
*/