#!/usr/bin/env python3
"""
Backend API Testing Script for Contact Form
Tests the contact form endpoints and validates responses
"""

import requests
import json
import sys
from typing import Dict, Any, List
import time
from datetime import datetime

# Get the backend URL from frontend environment
BACKEND_URL = "https://cross-border-pm.preview.emergentagent.com/api"

class ContactFormAPITester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        self.test_results = []
        
    def log_result(self, test_name: str, success: bool, details: str, response: requests.Response = None):
        """Log test results for later reporting"""
        result = {
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat()
        }
        if response:
            result['status_code'] = response.status_code
            result['response_time'] = response.elapsed.total_seconds()
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if response:
            print(f"    Status Code: {response.status_code}, Response Time: {response.elapsed.total_seconds():.3f}s")
        print()

    def test_root_api(self):
        """Test GET /api/ - should return Hello World message"""
        try:
            response = self.session.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_result("Root API Endpoint", True, "Root API returned expected Hello World message", response)
                    return True
                else:
                    self.log_result("Root API Endpoint", False, f"Expected 'Hello World', got: {data}", response)
                    return False
            else:
                self.log_result("Root API Endpoint", False, f"Expected 200, got: {response.status_code}", response)
                return False
        except Exception as e:
            self.log_result("Root API Endpoint", False, f"Request failed: {str(e)}")
            return False

    def test_contact_post_valid(self):
        """Test POST /api/contact with valid data"""
        test_data = {
            "name": "John Smith",
            "email": "john.smith@email.com", 
            "subject": "Portfolio Inquiry",
            "message": "Hello, I'm interested in discussing a potential collaboration for a web development project. Your portfolio shows excellent work!"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/contact", 
                                       data=json.dumps(test_data))
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['success', 'message', 'email_sent']
                
                if all(field in data for field in required_fields):
                    if data['success'] is True:
                        self.log_result("POST Contact Valid Data", True, 
                                      f"Contact form submitted successfully. Email sent: {data['email_sent']}", response)
                        return True
                    else:
                        self.log_result("POST Contact Valid Data", False, 
                                      f"Success field is False: {data}", response)
                        return False
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result("POST Contact Valid Data", False, 
                                  f"Missing required fields: {missing}", response)
                    return False
            else:
                try:
                    error_data = response.json()
                    self.log_result("POST Contact Valid Data", False, 
                                  f"Expected 200, got {response.status_code}: {error_data}", response)
                except:
                    self.log_result("POST Contact Valid Data", False, 
                                  f"Expected 200, got {response.status_code}: {response.text}", response)
                return False
        except Exception as e:
            self.log_result("POST Contact Valid Data", False, f"Request failed: {str(e)}")
            return False

    def test_contact_validation_empty_name(self):
        """Test POST /api/contact with empty name"""
        test_data = {
            "name": "",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "Test message content"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/contact", 
                                       data=json.dumps(test_data))
            
            if response.status_code == 422:
                self.log_result("Validation - Empty Name", True, 
                              "Correctly rejected empty name with 422 validation error", response)
                return True
            else:
                self.log_result("Validation - Empty Name", False, 
                              f"Expected 422 validation error, got: {response.status_code}", response)
                return False
        except Exception as e:
            self.log_result("Validation - Empty Name", False, f"Request failed: {str(e)}")
            return False

    def test_contact_validation_missing_email(self):
        """Test POST /api/contact with missing email field"""
        test_data = {
            "name": "Test User",
            "subject": "Test Subject", 
            "message": "Test message content"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/contact", 
                                       data=json.dumps(test_data))
            
            if response.status_code == 422:
                self.log_result("Validation - Missing Email", True, 
                              "Correctly rejected missing email with 422 validation error", response)
                return True
            else:
                self.log_result("Validation - Missing Email", False, 
                              f"Expected 422 validation error, got: {response.status_code}", response)
                return False
        except Exception as e:
            self.log_result("Validation - Missing Email", False, f"Request failed: {str(e)}")
            return False

    def test_contact_validation_invalid_email(self):
        """Test POST /api/contact with invalid email format"""
        test_data = {
            "name": "Test User",
            "email": "notanemail",
            "subject": "Test Subject",
            "message": "Test message content"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/contact", 
                                       data=json.dumps(test_data))
            
            if response.status_code == 422:
                self.log_result("Validation - Invalid Email", True, 
                              "Correctly rejected invalid email with 422 validation error", response)
                return True
            else:
                self.log_result("Validation - Invalid Email", False, 
                              f"Expected 422 validation error, got: {response.status_code}", response)
                return False
        except Exception as e:
            self.log_result("Validation - Invalid Email", False, f"Request failed: {str(e)}")
            return False

    def test_contact_validation_empty_message(self):
        """Test POST /api/contact with empty message"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": ""
        }
        
        try:
            response = self.session.post(f"{self.base_url}/contact", 
                                       data=json.dumps(test_data))
            
            if response.status_code == 422:
                self.log_result("Validation - Empty Message", True, 
                              "Correctly rejected empty message with 422 validation error", response)
                return True
            else:
                self.log_result("Validation - Empty Message", False, 
                              f"Expected 422 validation error, got: {response.status_code}", response)
                return False
        except Exception as e:
            self.log_result("Validation - Empty Message", False, f"Request failed: {str(e)}")
            return False

    def test_contact_get_messages(self):
        """Test GET /api/contact - should return stored messages"""
        try:
            response = self.session.get(f"{self.base_url}/contact")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("GET Contact Messages", True, 
                                  f"Successfully retrieved {len(data)} contact messages", response)
                    
                    # If we have messages, validate structure
                    if len(data) > 0:
                        first_msg = data[0]
                        required_fields = ['id', 'name', 'email', 'subject', 'message', 'timestamp']
                        if all(field in first_msg for field in required_fields):
                            self.log_result("GET Contact Messages Structure", True, 
                                          "Contact message structure is correct")
                        else:
                            missing = [f for f in required_fields if f not in first_msg]
                            self.log_result("GET Contact Messages Structure", False, 
                                          f"Missing fields in message: {missing}")
                    return True
                else:
                    self.log_result("GET Contact Messages", False, 
                                  f"Expected list, got: {type(data)}", response)
                    return False
            else:
                self.log_result("GET Contact Messages", False, 
                              f"Expected 200, got: {response.status_code}", response)
                return False
        except Exception as e:
            self.log_result("GET Contact Messages", False, f"Request failed: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all contact form API tests"""
        print(f"🧪 Starting Contact Form API Tests")
        print(f"Backend URL: {self.base_url}")
        print("=" * 60)
        print()
        
        # Test order matches review request
        tests = [
            self.test_root_api,
            self.test_contact_post_valid,
            self.test_contact_validation_empty_name,
            self.test_contact_validation_missing_email,
            self.test_contact_validation_invalid_email,
            self.test_contact_validation_empty_message,
            self.test_contact_get_messages
        ]
        
        passed = 0
        failed = 0
        
        for test in tests:
            try:
                if test():
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ CRITICAL ERROR in {test.__name__}: {str(e)}")
                failed += 1
            
            time.sleep(0.5)  # Small delay between tests
        
        print("=" * 60)
        print(f"📊 TEST SUMMARY")
        print(f"Total Tests: {passed + failed}")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"Success Rate: {passed/(passed + failed)*100:.1f}%" if (passed + failed) > 0 else "No tests run")
        
        return failed == 0

def main():
    """Main test execution"""
    print("🚀 Contact Form Backend API Test Suite")
    print()
    
    tester = ContactFormAPITester(BACKEND_URL)
    
    all_passed = tester.run_all_tests()
    
    if all_passed:
        print("\n🎉 All tests passed! Contact form backend is working correctly.")
        sys.exit(0)
    else:
        print("\n⚠️  Some tests failed. Check the results above for details.")
        sys.exit(1)

if __name__ == "__main__":
    main()