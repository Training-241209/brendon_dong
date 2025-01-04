package com.revature.bdong_ers.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.bdong_ers.Entities.Role;
import com.revature.bdong_ers.Entities.User;
import com.revature.bdong_ers.Repositories.RoleRepository;
import com.revature.bdong_ers.Repositories.UserRepository;
@Service
public class RoleService {

    private RoleRepository roleRepository;
    private UserRepository userRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }   
    
    public boolean hasAdminPermissions(int userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        Role role = roleRepository.findById(user.getRoleId()).orElse(null);
        if (role == null) {
            return false;
        }
        return role.isAdmin();
    }
    
    public boolean hasAdminPermissions(User user) {
        Role userRole = roleRepository.findById(user.getRoleId()).orElse(null);
        if (userRole == null) {
            return false;
        }
        return userRole.isAdmin();
    }
}
