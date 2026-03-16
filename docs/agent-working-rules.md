1. GENERAL EXECUTION RULES

Agent không được viết code ngay.

Thứ tự bắt buộc:

1 read repository
2 identify required files
3 verify contracts
4 confirm exports
5 confirm workspace wiring
6 then implement

Nếu thiếu file → phải yêu cầu file trước khi code.

Không được suy đoán.

2. REPOSITORY READING PHASE (BẮT BUỘC)

Trước khi sửa bất kỳ package nào, agent phải đọc:

package.json (root)
tsconfig.base.json
pnpm-workspace.yaml
turbo.json

Sau đó đọc:

target package package.json
target package tsconfig.json
src/index.ts
src/contracts.ts (nếu có)

Agent không được giả định public API.

3. CONTRACT PROTECTION RULE

Files sau không được sửa nếu task không yêu cầu rõ:

contracts.ts
public API index.ts

Nếu cần thay đổi contract:

Agent phải báo:

Contract change required
reason
affected packages

rồi mới được sửa.

4. PACKAGE CREATION RULE

Agent không được tự tạo package mới nếu chưa xác nhận:

pnpm-workspace.yaml
tsconfig.base.json paths
turbo pipeline

Nếu thiếu wiring → phải thêm đầy đủ.

5. FILE OUTPUT RULE (QUAN TRỌNG)

Khi sửa file:

Agent phải xuất FULL FILE.

Không patch.

Format:

FILE: packages/xxx/src/file.ts

<full file content>
6. REQUIRED OUTPUT FORMAT

Sau khi implement, agent phải xuất:

Changed Files
New Files
Full contents of each new file
Full contents of each modified file

Không được nói chung chung.

7. VALIDATION RULE

Agent phải chạy:

pnpm typecheck
pnpm build

Nếu repo có smoke tests:

pnpm smoke

Kết quả phải report.

8. NO ASSUMPTION RULE

Agent không được:

invent file
invent API
invent contract
guess types
guess exports

Nếu không chắc:

request file
9. CANON SAFETY RULE (MIKAGE SPECIFIC)

Agent không được bypass pipeline order.

Pipeline chuẩn:

context
→ narrative
→ canon validation
→ production package
→ generation
→ benchmark

Không được đảo.

10. CHARACTER / ASSET RULE

Asset generation phải có:

lineage
source prompt
model
seed
reference

Không tạo asset thiếu metadata.

11. ERROR HANDLING RULE

Nếu type error xảy ra:

Agent phải:

trace source type
identify contract mismatch
fix root cause

Không dùng:

any
type cast
ignore
12. MERGE RULE

Code không được coi là hoàn thành nếu:

typecheck fail
missing export
workspace wiring broken