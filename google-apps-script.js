// ============================================
// Google Apps Script - 소상공인종합지원안내센터 폼 이메일 전송
// ============================================
// 
// [배포 방법]
// 1. https://script.google.com 접속 (발신용 Gmail 계정으로 로그인)
// 2. "새 프로젝트" 클릭
// 3. 이 코드를 전체 복사하여 붙여넣기
// 4. 아래 RECIPIENT_EMAIL을 수신할 이메일 주소로 변경
// 5. 상단 메뉴 > 배포 > 새 배포 (또는 배포 관리 > 버전 수정)
// 6. 유형: "웹 앱" 선택
// 7. 실행 사용자: "나" / 액세스 권한: "모든 사용자"
// 8. 배포 클릭 > 권한 승인
// 9. 생성된 URL을 복사하여 각 HTML 파일의 GOOGLE_SCRIPT_URL에 붙여넣기
// ============================================

var RECIPIENT_EMAIL = 'ansook9266@naver.com';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var formType = data['신청유형'] || '기타';
    var companyName = data['기업명'] || '';
    
    var subject = '';
    var rows = [];
    var color = '#374151';
    var title = '문의 접수';
    
    if (formType === '폐업지원') {
      subject = '[폐업지원 신청] ' + companyName;
      color = '#2563eb';
      title = '폐업지원 신청서';
      rows = [
        ['기업명', data['기업명']],
        ['사업장 주소', data['사업장주소']],
        ['성함', data['성함']],
        ['연락처', data['연락처']],
        ['업종', data['업종']],
        ['사업장 면적', data['사업장면적']],
        ['전달내용', data['전달내용']]
      ];
    } else if (formType === '자금컨설팅') {
      subject = '[자금컨설팅 신청] ' + companyName;
      color = '#f97316';
      title = '자금컨설팅 신청서';
      rows = [
        ['기업명', data['기업명']],
        ['사업장 주소', data['사업장주소']],
        ['성함', data['성함']],
        ['연락처', data['연락처']],
        ['업종', data['업종']],
        ['필요금액', data['필요금액']],
        ['전달내용', data['전달내용']]
      ];
    } else if (formType === '매출담보') {
      subject = '[매출담보상품 신청] ' + companyName;
      color = '#9333ea';
      title = '매출담보상품 신청서';
      rows = [
        ['기업명', data['기업명']],
        ['사업장 주소', data['사업장주소']],
        ['성함', data['성함']],
        ['연락처', data['연락처']],
        ['업종', data['업종']],
        ['전년도 매출액', data['전년도매출액']],
        ['전달내용', data['전달내용']]
      ];
    } else if (formType === '임대보증금제로') {
      subject = '[임대보증금제로 신청] ' + (data['성명/상호'] || '');
      color = '#16a34a';
      title = '임대보증금제로 신청서';
      var keys = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== '신청유형') {
          rows.push([keys[i], data[keys[i]]]);
        }
      }
    } else {
      subject = '[문의] ' + companyName;
      var keys2 = Object.keys(data);
      for (var i = 0; i < keys2.length; i++) {
        if (keys2[i] !== '신청유형') {
          rows.push([keys2[i], data[keys2[i]]]);
        }
      }
    }
    
    var body = buildEmail(title, color, rows);
    
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      htmlBody: body
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function buildEmail(title, color, rows) {
  var tableRows = '';
  for (var i = 0; i < rows.length; i++) {
    var label = rows[i][0] || '';
    var value = rows[i][1] || '-';
    if (!value || value === '') value = '-';
    value = String(value).replace(/\n/g, '<br>');
    var bgStyle = (i % 2 === 1) ? ' style="background: #f9fafb;"' : '';
    tableRows += '<tr' + bgStyle + '>'
      + '<td style="padding: 10px 12px; font-weight: bold; width: 130px; border-bottom: 1px solid #e5e7eb;">' + label + '</td>'
      + '<td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">' + value + '</td>'
      + '</tr>';
  }
  
  var now = new Date();
  var kst = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  var dateStr = kst.getFullYear() + '-' 
    + ('0' + (kst.getMonth() + 1)).slice(-2) + '-' 
    + ('0' + kst.getDate()).slice(-2) + ' ' 
    + ('0' + kst.getHours()).slice(-2) + ':' 
    + ('0' + kst.getMinutes()).slice(-2) + ':' 
    + ('0' + kst.getSeconds()).slice(-2);
  
  return '<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">'
    + '<div style="background: ' + color + '; color: white; padding: 20px; border-radius: 8px 8px 0 0;">'
    + '<h2 style="margin: 0;">' + title + '</h2>'
    + '</div>'
    + '<div style="padding: 0; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">'
    + '<table style="width: 100%; border-collapse: collapse;">'
    + tableRows
    + '</table>'
    + '<p style="color: #6b7280; font-size: 12px; padding: 12px; margin: 0;">접수일시: ' + dateStr + '</p>'
    + '</div>'
    + '</div>';
}
