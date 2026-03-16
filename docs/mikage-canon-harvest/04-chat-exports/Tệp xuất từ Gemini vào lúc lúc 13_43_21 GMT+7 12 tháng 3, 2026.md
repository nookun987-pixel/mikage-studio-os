Thư mục \[Muse.StudioZenith\] dường như là kho chứa mã nguồn và tài liệu vận hành cho một ứng dụng có tên **Musezenith Studio**, được mô tả là một "Studio sản xuất biên tập thời trang AI" (AI Fashion Editorial Production Studio) hoặc "Solo Image Studio" (Studio Ảnh Đơn lẻ).

Dựa trên các tài liệu có sẵn, đây là thông tin chi tiết:1. Mục đích và Định vị Sản phẩm (Product Positioning)

* **Musezenith Studio** được định vị là một **hệ thống quy trình làm việc hình ảnh hướng đến sản xuất** dành cho các đội ngũ sáng tạo (đặc biệt là agency sáng tạo boutique và đội ngũ nội bộ trong ngành thời trang, làm đẹp, phong cách sống).  
* Nó không chỉ là một công cụ tạo ảnh đơn lẻ mà còn giải quyết vấn đề **hỗn loạn trong quyết định và bàn giao** sau khi hình ảnh đã được tạo.  
* **Giá trị cốt lõi:**  
  * **Tốc độ:** Tạo ra các biến thể hình ảnh nhanh chóng với kiểm soát rõ ràng về seed (hạt giống) và variant (biến thể).  
  * **Tính nhất quán:** Có gói nhắc lệnh (prompt package) được cấu trúc, điểm số và ngữ cảnh QC (Kiểm soát chất lượng).  
  * **Chất lượng quyết định:** Quy trình so sánh (Compare) song song và đánh dấu chọn cuối cùng (Final selection).  
  * **Độ tin cậy vận hành:** Lịch sử lưu trữ (Archive), chạy lại (Re-run), và gói xuất (Export bundle) có thể truy vết.

2\. Quy trình làm việc cốt lõi (Core Workflow)

Quy trình làm việc chuẩn hóa cho việc tạo và quyết định hình ảnh bao gồm 7 bước chính:

1. **Chief (Trưởng nhóm):** Đặt mục tiêu, giới hạn và kế hoạch công việc (Job plan).  
2. **Compile (Biên soạn):** Tạo ra các bộ nhắc lệnh Positive/Negative (Prompt) và tham số chi tiết (Sampler, Steps, CFG, Seed Rule) theo các chế độ (canon\_core, luminous\_fan\_appeal, luxury\_mystical\_editorial).  
3. **Generate (Tạo hình):** Chạy các lệnh đã biên soạn để tạo ra hình ảnh (Sử dụng Vertex Imagen là công cụ sản xuất hình ảnh chính).  
4. **Review (Đánh giá):** Chấm điểm đầu ra dựa trên các tiêu chí như độ trung thực về "linh hồn" (Soul fidelity), độ hấp dẫn thị giác, cảm giác sang trọng/biên tập.  
5. **Canon Gate (Cổng Chuẩn mực):** Kiểm tra xem kết quả có vi phạm các quy tắc bất biến (Absolute Invariants) và giới hạn cốt lõi (Lore Constraints) của dự án MIKAGE ZENITH hay không.  
6. **Archive (Lưu trữ):** Lưu lại toàn bộ hồ sơ chạy, bao gồm Brief, Prompt, Tham số, Đầu ra, Đánh giá và Phân loại.  
7. **Next Run Recommendation:** Đề xuất cho lần chạy tiếp theo.

3\. Thành phần và Tính năng Chính trong Ứng dụng

Các trang và chức năng chính của ứng dụng bao gồm:

* **Dashboard:** Tổng quan các số liệu vận hành, cảnh báo, và hiệu suất của các chế độ.  
* **Prompt Composer / PromptLab:** Nơi người dùng nhập brief, chọn preset, và tạo gói nhắc lệnh có cấu trúc (structured prompt package).  
* **Archive (Thư viện Tài sản):** Nơi lưu giữ lịch sử của mọi lần chạy, cho phép tìm kiếm, lọc và truy xuất để chạy lại hoặc so sánh.  
* **Compare Panel:** Chức năng so sánh trực quan hai mục tiêu (ảnh hoặc lần chạy) cạnh nhau.  
* **Proof Board (Bảng Chứng minh) / Campaign Delivery:** Khu vực để quản lý và chuẩn bị các bộ ảnh/bằng chứng cuối cùng để bàn giao cho khách hàng (Client Pitch).  
* **Reference Library / Japanese Knowledge:** Chứa hệ thống tri thức trực quan có cấu trúc về Ngữ pháp Nghệ thuật Nhật Bản và các nguyên tắc cốt lõi của dự án Mikage.  
* **Studio Chief / Editorial Planner:** Nơi tạo các kế hoạch công việc và biên soạn nhắc lệnh hàng loạt (batch compilation) cho dự án Mikage Zenith.  
* **Control Room:** Dashboard vận hành để theo dõi các job và metrics hệ thống.

4\. Dự án Khách hàng Cốt lõi (MIKAGE ZENITH)

Musezenith Studio có một dự án khách hàng nổi bật là **MIKAGE ZENITH**, với các quy tắc và triết lý hình ảnh nghiêm ngặt:

* **Triết lý Cốt lõi:** "Trí tuệ phải đi kèm hậu quả" (Intelligence must carry consequence).  
* **Giới hạn Sáng tạo:** Phải tuân thủ các quy tắc **Bất biến Tuyệt đối** (ví dụ: Hard Sci-Fi, cấm phép thuật, Luật Landauer, bảng màu khóa).  
* **3 Chế độ Kiểm tra Cố định:** Mọi batch test luôn chạy qua 3 chế độ:  
  * canon\_core (giữ tinh thần cốt lõi Mikage, baseline an toàn)  
  * luminous\_fan\_appeal (lung linh hơn, hút fan hơn)  
  * luxury\_mystical\_editorial (sang trọng hơn, bí ẩn hơn, hướng campaign)

Thư mục này cho thấy một nỗ lực xây dựng một công cụ mạnh mẽ, không chỉ để tạo ra nội dung AI mà còn để quản lý và chuẩn hóa toàn bộ quy trình từ ý tưởng đến quyết định cuối cùng, đặc biệt tập trung vào thị trường biên tập thời trang và các dự án IP có quy tắc khắt khe như MIKAGE ZENITH.

Nguồn:

* [01\_Mikage\_Core\_Spec.txt](https://drive.google.com/open?id=1noaoag8bwW7jPg_2eX4CCpMfoB_BlHpE)  
* [IMAGE\_PRODUCT\_GTM\_PLAYBOOK.md](https://drive.google.com/open?id=1WCvxADxwAwKrju1bDP8I8j9_r_DHkXWL)  
* [App.jsx](https://drive.google.com/open?id=19GMUeW59Qo0uv9YKbvreVPRwJXv-GbGO)  
* [IMAGE\_STUDIO\_OPERATIONS\_SERVICE\_PACKAGING\_PLAYBOOK.md](https://drive.google.com/open?id=1l8pOWLh2bCC82dP9kuwbDoJ2qEYvxcRY)  
* [IMAGE\_CUSTOMER\_ONBOARDING\_PACKAGE.md](https://drive.google.com/open?id=1BNuLxm5TlicrtLiSv9IdZBi63e0ZJxzc)  
* [IMAGE\_PRODUCT\_GTM\_PLAYBOOK.md](https://drive.google.com/open?id=1DC4zLpRZjS6EZwlnXCCy6IQ9uXstrJDV)  
* [IMAGE\_LANDING\_PAGE\_COPY\_PACKAGE.md](https://drive.google.com/open?id=1sXQHJEYiNxSEvHJbW0F2gMxTWp71f6x3)  
* [IMAGE\_STUDIO\_OPERATIONS\_SERVICE\_PACKAGING\_PLAYBOOK.md](https://drive.google.com/open?id=1DAe3Ugc-QPtvF_3RRJrZDPn98eUefypC)  
* [04\_Studio\_Test\_Workflow.txt](https://drive.google.com/open?id=1Oe9XWvxRqQn5r5Soj7mV2ExkRuZdN1D3)  
* [IMAGE\_CUSTOMER\_ONBOARDING\_PACKAGE.md](https://drive.google.com/open?id=1WEHxwENkfKFOX9uqLgg3ii4DW-VlM8Gf)  
* [JapaneseKnowledge.jsx](https://drive.google.com/open?id=1NL3Ogy7OwvHOcH6dM77fZeo18c9fMjPq)  
* [STUDIO\_OS\_REAL\_STACK.md](https://drive.google.com/open?id=1NqW_QP8mMioYBW2-MiUBDfTubZSegJZ8)  
* [Dashboard.jsx](https://drive.google.com/open?id=1znLK9U4EiXjBJeCiAmd5PCt5FV5bs-Zi)  
* [README.md](https://drive.google.com/open?id=18EbO8ZVVtLvBq2S2_KN1hgSijDNgvTvH)  
* [StudioChief.jsx](https://drive.google.com/open?id=1nF8DUzdC0lNxRPubr86TOReFt05i4fAl)  
* [mikageClient.js](https://drive.google.com/open?id=1KAmKbHSQdUgoyB66eMBU-uwj-qJSOYBU)  
* [IMAGE\_WORKFLOW\_OPERATING\_MANUAL.md](https://drive.google.com/open?id=1QZLMrWmDcJCylwxXdp7srHruxiEQcKyN)  
* [IMAGE\_WORKFLOW\_OPERATING\_MANUAL.md](https://drive.google.com/open?id=1BMMrDSzva9VIe2WolftWI03fyzn4va8-)  
* [App.jsx](https://drive.google.com/open?id=1ZKJStXDq4ZsjhNTL0k2G8jmEPlXhtbwF)  
* [ProofBoard.jsx](https://drive.google.com/open?id=16iTSKuTi0Bfk1JAm936EqyvxXuz1RJjy)  
* [MIKAGE ZENITH \- SINGLE SOURCE OF TRUTH (V1.3).md](https://drive.google.com/open?id=1a4_Y6aU8VrK_uCsvlBH0exjdkZzb8mxw)  
* [03\_Mikage\_Prompt\_Pack.txt](https://drive.google.com/open?id=1sUH_UhmzxYTYWwSpiji0vyDNaZsanD07)  
* [IMAGE\_LANDING\_PAGE\_COPY\_PACKAGE.md](https://drive.google.com/open?id=1KgNbQ8tCwR0mEzEqz34MjBkYDHZRt_yi)